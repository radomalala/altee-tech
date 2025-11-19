// Contact form with Postgres insert + optional email via Resend
import { safeQuery, query } from './db.js';

async function sendEmail({ name, company, email, type, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: 'RESEND_API_KEY missing' };
  const to = process.env.RESEND_TO || 'contact@alteetech.com';
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const subject = `Nouveau contact – ${name}`;
  const html = `
    <div style="font-family:Inter,system-ui,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 8px 0">Nouveau message de contact</h2>
      <p style="margin:0 0 12px 0;color:#334155">Reçu depuis le site Altee Tech.</p>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;width:140px;color:#64748b">Nom</td><td>${name}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Entreprise</td><td>${company || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Email</td><td>${email}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Type</td><td>${type}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Message</td><td>${(message || '').replace(/\n/g,'<br/>')}</td></tr>
      </table>
    </div>
  `;
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from, to, subject, html })
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn('Resend error:', resp.status, text);
      return { sent: false, reason: 'API error' };
    }
    return { sent: true };
  } catch (err) {
    console.warn('Email send failed:', err.message);
    return { sent: false, reason: 'network' };
  }
}

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
    const emailResult = await sendEmail({ name, company, email, type, message });
    res.status(200).json({ 
      success: true, 
      persisted: dbOk, 
      emailed: emailResult.sent,
      message: dbOk ? 'Enregistré en base.' : 'Simulation (DB off).'
    });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}
