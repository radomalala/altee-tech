import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Base de données en mémoire ---

let leads = [
  { id: 1, name: "Jean Dupont", company: "Logistix SA", type: "Devis IA", date: "19/11/2025", status: "Nouveau" },
  { id: 2, name: "Sophie Martin", company: "StartUp Flow", type: "Formation", date: "18/11/2025", status: "En cours" }
];

// Liste des formations (Connectée au Frontend)
let trainings = [
  { id: 1, student: "Lucas Dubois", course: "Masterclass IA Generative", date: "25/11/2025", progress: "Inscrit" },
  { id: 2, student: "Amélie Poulain", course: "Dev Mobile Kotlin", date: "02/12/2025", progress: "Confirmé" },
  { id: 3, student: "Marc Levy", course: "Automatisation n8n", date: "28/11/2025", progress: "En attente" }
];

// --- Routes API ---

app.get('/', (req, res) => {
  res.send('🚀 Serveur Altee Tech API est en ligne !');
});

// 1. GET Leads
app.get('/api/leads', (req, res) => {
  console.log('📥 Admin demande la liste des leads');
  res.json(leads);
});

// 2. GET Trainings (Essentiel pour le nouveau Frontend)
app.get('/api/trainings', (req, res) => {
  console.log('🎓 Admin demande la liste des formations');
  res.json(trainings);
});

// 3. POST Contact (Intelligent)
app.post('/api/contact', (req, res) => {
  const newLead = req.body;
  
  // Enrichissement des données
  newLead.id = leads.length + 1;
  newLead.date = new Date().toLocaleDateString("fr-FR");
  newLead.status = "Nouveau";

  console.log('✨ Nouveau Lead reçu :', newLead.name, '(', newLead.type, ')');
  leads.unshift(newLead);

  // LOGIQUE AUTOMATIQUE : Si c'est une demande de formation, on l'ajoute aussi dans "Academy"
  if (newLead.type === "Formation & Academy") {
    const newTraining = {
      id: trainings.length + 1,
      student: newLead.name, // Le nom du contact devient l'étudiant
      course: "À définir (Pré-inscription)",
      date: newLead.date,
      progress: "En attente"
    };
    trainings.unshift(newTraining);
    console.log('   ↳ 🎓 Ajouté automatiquement aux pré-inscriptions Academy !');
  }
  
  setTimeout(() => {
    res.json({ success: true, message: "Demande enregistrée avec succès !" });
  }, 1000);
});

app.listen(port, () => {
  console.log(`\n⚡️ Moteur Backend démarré sur http://localhost:${port}`);
});