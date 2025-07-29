'use server';

import { Pool } from 'pg';

// Comprueba si la variable de entorno está definida al inicio.
if (!process.env.POSTGRES_URL) {
  // Este error se lanzará durante la compilación si la variable no está definida,
  // deteniendo el proceso antes de que la aplicación intente ejecutarse sin ella.
  throw new Error('CRÍTICO: La variable de entorno POSTGRES_URL no está definida.');
}

// Crea una nueva instancia del pool de conexiones de PostgreSQL
// El pool gestiona eficientemente las conexiones a la base de datos.
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // Opciones recomendadas para entornos serverless
  max: 1, // Límite de clientes en el pool a 1 para evitar problemas en serverless
  idleTimeoutMillis: 30000, // Tiempo que un cliente puede estar inactivo
  connectionTimeoutMillis: 10000, // Tiempo para esperar una conexión (reducido a 10s)
});

/**
 * Ejecuta una consulta SQL en la base de datos PostgreSQL.
 * @param text La consulta SQL a ejecutar.
 * @param params Los parámetros para la consulta SQL.
 * @returns El resultado de la consulta.
 */
export async function query(text: string, params: any[]) {
  const start = Date.now();
  try {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        const duration = Date.now() - start;
        console.log('Consulta ejecutada:', { text, duration, rows: res.rowCount });
        return res;
    } finally {
        client.release();
    }
  } catch (error) {
    console.error('Error de base de datos:', error);
    
    // El mensaje de error ahora es mucho más específico y accionable
    console.error(`
      -----------------------------------------------------------------
      FALLO EN LA CONEXIÓN A POSTGRESQL: La aplicación no pudo conectarse a la base de datos.
      CAUSA MÁS PROBABLE: Problema de red, firewall o permisos.
      
      QUÉ REVISAR:
      1.  **Redes Autorizadas en Cloud SQL:** Asegúrate de que la dirección IP de la aplicación que se conecta esté en la lista de "Redes Autorizadas" de tu instancia de Cloud SQL. Para App Hosting, esto a menudo requiere autorizar la IP de salida del servicio.
      2.  **Firewall de VPC:** Si tu instancia usa una IP privada, verifica las reglas de firewall de la VPC para permitir el tráfico en el puerto 5432 desde el origen de tu aplicación.
      3.  **Credenciales:** Vuelve a verificar que el usuario, la contraseña y el nombre de la base de datos en tu POSTGRES_URL son correctos.
      -----------------------------------------------------------------
    `);
    
    // Lanza el error para que las funciones que llaman puedan manejarlo
    throw error;
  }
}
