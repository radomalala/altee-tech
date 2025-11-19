// Vercel Serverless Function: Contact form
// Simulates persistence; replace with real DB/service (e.g. SendGrid + DB).

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
    // Fake processing delay
    await new Promise(r => setTimeout(r, 300));
    res.status(200).json({ success: true, message: 'Demande reçue (simulation serverless).' });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}
