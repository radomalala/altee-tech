/* eslint-env node */
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import process from 'node:process';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Configuration Base de Données (SQLite) ---
// Cela va créer un fichier 'database.db' à la racine du projet
let db;

async function initDB() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  console.log('📦 Base de données SQLite connectée.');

  // Création des tables si elles n'existent pas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      company TEXT,
      email TEXT,
      type TEXT,
      message TEXT,
      date TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS trainings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student TEXT,
      course TEXT,
      date TEXT,
      progress TEXT
    );
  `);
}

initDB().catch(err => console.error("Erreur init DB:", err));

// --- Routes API ---

app.get('/', (req, res) => {
  res.send('🔐 Serveur Altee Tech (Secure + DB) en ligne !');
});

// 🔐 1. Route LOGIN (Sécurité simple)
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  // Mot de passe en dur pour le prototype (à changer en prod)
  if (password === "admin123") {
    res.json({ success: true, token: "fake-jwt-token-123456" });
  } else {
    res.status(401).json({ success: false, message: "Mot de passe incorrect" });
  }
});

// 2. GET Leads (Depuis SQLite)
app.get('/api/leads', async (req, res) => {
  const leads = await db.all('SELECT * FROM leads ORDER BY id DESC');
  res.json(leads);
});

// 3. GET Trainings (Depuis SQLite)
app.get('/api/trainings', async (req, res) => {
  const trainings = await db.all('SELECT * FROM trainings ORDER BY id DESC');
  res.json(trainings);
});

// 4. POST Contact (Sauvegarde en SQLite)
app.post('/api/contact', async (req, res) => {
  const { name, company, email, type, message } = req.body;
  const date = new Date().toLocaleDateString("fr-FR");
  const status = "Nouveau";

  try {
    // Insertion Lead
    const result = await db.run(
      `INSERT INTO leads (name, company, email, type, message, date, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, company, email, type, message, date, status]
    );

    console.log(`✨ Nouveau Lead enregistré (ID: ${result.lastID}) : ${name}`);

    // Logique Automatique : Ajout Formation si nécessaire
    if (type === "Formation & Academy") {
      await db.run(
        `INSERT INTO trainings (student, course, date, progress) VALUES (?, ?, ?, ?)`,
        [name, "À définir (Pré-inscription)", date, "En attente"]
      );
      console.log('   ↳ 🎓 Ajouté automatiquement aux pré-inscriptions Academy !');
    }

    // Optional: send notification email via Resend if configured
    const sendEmailIfConfigured = async () => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) return { sent: false };
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
        </div>`;
      try {
        if (typeof fetch === 'undefined') return { sent: false };
        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to, subject, html })
        });
        return { sent: resp.ok };
      } catch {
        return { sent: false };
      }
    };

    const emailInfo = await sendEmailIfConfigured();
    res.json({ success: true, emailed: emailInfo.sent, message: "Sauvegardé en base de données !" });
  } catch (error) {
    console.error("Erreur SQL:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log(`\n⚡️ Serveur démarré sur http://localhost:${port}`);
});

// Direct email (no DB) for parity with Vercel /api/email
app.post('/api/email', async (req, res) => {
  const { name, company, email, type, message } = req.body || {};
  if (!name || !email) {
    res.status(400).json({ success: false, error: 'Champs requis manquants' });
    return;
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.json({ success: true, emailed: false, reason: 'RESEND_API_KEY missing' });
    return;
  }
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
        <tr><td style="padding:8px 0;color:#64748b">Type</td><td>${type || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Message</td><td>${(message || '').replace(/\n/g,'<br/>')}</td></tr>
      </table>
    </div>
  `;
  try {
    if (typeof fetch === 'undefined') {
      res.json({ success: true, emailed: false, reason: 'fetch unavailable' });
      return;
    }
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html })
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn('Resend error:', resp.status, text);
      res.json({ success: true, emailed: false, reason: 'API error' });
      return;
    }
    res.json({ success: true, emailed: true });
  } catch (err) {
    console.warn('Email send failed:', err.message);
    res.json({ success: true, emailed: false, reason: 'network' });
  }
});