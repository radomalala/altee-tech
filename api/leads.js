// Vercel Serverless Function: Leads
// NOTE: SQLite local file persistence is not reliable on Vercel deployments.
// Replace with a hosted DB (Neon/Postgres, PlanetScale/MySQL, Supabase) for production.

const sampleLeads = [
  { id: 1, name: 'Jean Dupont', company: 'Logistix SA', type: 'Devis IA', date: '19/11/2025', status: 'Nouveau' },
  { id: 2, name: 'Sophie Martin', company: 'StartUp Flow', type: 'Formation', date: '18/11/2025', status: 'En cours' }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  res.status(200).json(sampleLeads);
}
