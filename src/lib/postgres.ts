'use server';

import { Pool } from 'pg';

if (!process.env.POSTGRES_URL) {
  throw new Error('CRITICAL: POSTGRES_URL environment variable is not defined.');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 1, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});


/**
 * Executes an SQL query against the PostgreSQL database.
 * @param text The SQL query to execute.
 * @param params The parameters for the SQL query.
 * @returns The result of the query.
 */
export async function query(text: string, params: any[]) {
  const start = Date.now();
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  } finally {
    client.release();
  }
}
