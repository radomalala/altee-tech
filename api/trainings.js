// Trainings serverless with Postgres fallback
import { safeQuery } from './db.js';

const sampleTrainings = [
  { id: 1, student: 'Lucas Dubois', course: 'Masterclass IA Generative', date: '25/11/2025', progress: 'Inscrit' },
  { id: 2, student: 'Amélie Poulain', course: 'Dev Mobile Kotlin', date: '02/12/2025', progress: 'Confirmé' }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const rows = await safeQuery('SELECT id, student, course, date, progress FROM trainings ORDER BY id DESC');
  res.status(200).json(rows && rows.length ? rows : sampleTrainings);
}
