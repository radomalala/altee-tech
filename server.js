import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

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

    res.json({ success: true, message: "Sauvegardé en base de données !" });
  } catch (error) {
    console.error("Erreur SQL:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log(`\n⚡️ Serveur démarré sur http://localhost:${port}`);
});