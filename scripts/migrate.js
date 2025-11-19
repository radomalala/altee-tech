// Migration script for Postgres (run locally)
// Usage:
//   set POSTGRES_URL then: node scripts/migrate.js
import { createClient } from '@vercel/postgres';

async function migrate() {
  if (!process.env.POSTGRES_URL) {
    console.error('POSTGRES_URL env var manquante.');
    process.exit(1);
  }
  const client = createClient({ connectionString: process.env.POSTGRES_URL });
  await client.connect();
  console.log('Connexion Postgres OK');
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT,
      company TEXT,
      email TEXT,
      type TEXT,
      message TEXT,
      date TEXT,
      status TEXT
    );`;
    await client.sql`CREATE TABLE IF NOT EXISTS trainings (
      id SERIAL PRIMARY KEY,
      student TEXT,
      course TEXT,
      date TEXT,
      progress TEXT
    );`;
    console.log('Migrations terminées');
  } finally {
    await client.end();
  }
}

migrate().catch(e => { console.error(e); process.exit(1); });