'use server';

import { Pool } from 'pg';

// Asegúrate de que la variable de entorno para la URL de la base de datos esté definida
if (!process.env.POSTGRES_URL) {
  throw new Error('La variable de entorno POSTGRES_URL no está definida.');
}

// Crea una nueva instancia del pool de conexiones de PostgreSQL
// El pool gestiona eficientemente las conexiones a la base de datos.
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // Opciones recomendadas para entornos serverless
  max: 10, // Límite de clientes en el pool
  idleTimeoutMillis: 30000, // Tiempo que un cliente puede estar inactivo
  connectionTimeoutMillis: 20000, // Tiempo para esperar una conexión
});

/**
 * Ejecuta una consulta SQL en la base de datos PostgreSQL.
 * @param text La consulta SQL a ejecutar.
 * @param params Los parámetros para la consulta SQL.
 * @returns El resultado de la consulta.
 */
export async function query(text: string, params: any[]) {
  const start = Date.now();
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log('Consulta ejecutada:', { text, duration, rows: res.rowCount });
    return res;
  } finally {
    client.release();
  }
}
