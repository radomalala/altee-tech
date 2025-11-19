// Leads serverless with Postgres fallback
import { safeQuery } from './db.js';

const sampleLeads = [
  { id: 1, name: 'Jean Dupont', company: 'Logistix SA', type: 'Devis IA', date: '19/11/2025', status: 'Nouveau' },
  { id: 2, name: 'Sophie Martin', company: 'StartUp Flow', type: 'Formation', date: '18/11/2025', status: 'En cours' }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const rows = await safeQuery('SELECT id, name, company, type, date, status FROM leads ORDER BY id DESC');
  res.status(200).json(rows && rows.length ? rows : sampleLeads);
}
