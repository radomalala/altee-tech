// Contact form with Postgres insert fallback to simulation
import { safeQuery, query } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const { name, company, email, type, message } = req.body || {};
    if (!name || !email) {
      res.status(400).json({ success: false, error: 'Champs requis manquants' });
      return;
    }
    const date = new Date().toLocaleDateString('fr-FR');
    const status = 'Nouveau';
    let dbOk = false;
    try {
      await query(
        'INSERT INTO leads (name, company, email, type, message, date, status) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [name, company, email, type, message, date, status]
      );
      if (type === 'Formation & Academy') {
        await query(
          'INSERT INTO trainings (student, course, date, progress) VALUES ($1,$2,$3,$4)',
          [name, 'À définir (Pré-inscription)', date, 'En attente']
        );
      }
      dbOk = true;
    } catch (dbErr) {
      console.warn('DB indisponible, simulation locale:', dbErr.message);
      await new Promise(r => setTimeout(r, 300)); // simulate delay
    }
    res.status(200).json({ success: true, persisted: dbOk, message: dbOk ? 'Enregistré en base.' : 'Simulation (DB off).' });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}
