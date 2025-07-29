'use server';

import { Pool } from 'pg';

// Comprueba si la variable de entorno está definida al inicio.
if (!process.env.POSTGRES_URL) {
  throw new Error('La variable de entorno POSTGRES_URL no está definida.');
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
    // Este mensaje te ayudará a diagnosticar si la variable de entorno está ausente.
    if (!process.env.POSTGRES_URL) {
        console.error('CRÍTICO: La variable de entorno POSTGRES_URL no fue encontrada durante la ejecución de la consulta.');
    } else {
        console.error('INFO: La variable POSTGRES_URL fue encontrada, el problema podría ser de red, firewall o credenciales incorrectas.');
    }
    // Lanza el error para que las funciones que llaman puedan manejarlo
    throw error;
  }
}
