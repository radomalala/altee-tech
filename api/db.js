// Postgres helper for Vercel serverless
// Uses @vercel/postgres. Ensure POSTGRES_URL is set in Vercel project settings.
import { createClient } from '@vercel/postgres';

let client; // Singleton reused across invocations when possible
let connected = false;

export async function getClient() {
  if (!client) {
    client = createClient({ connectionString: process.env.POSTGRES_URL });
  }
  if (!connected) {
    try {
      await client.connect();
      connected = true;
    } catch (err) {
      console.error('Postgres connection error:', err.message);
      throw err;
    }
  }
  return client;
}

export async function query(sql, params = []) {
  const c = await getClient();
  return c.query(sql, params);
}

export async function safeQuery(sql, params = []) {
  try {
    const res = await query(sql, params);
    return res.rows;
  } catch (e) {
    // Fallback empty if DB not reachable
    return null;
  }
}