import React, { useState, useEffect } from 'react';
import { 
  Brain, Rocket, Smartphone, Server, Wifi, GraduationCap, 
  MessageCircle, CheckCircle, ArrowRight, Menu, X, 
  BarChart3, Users, Calendar, FileText, LogOut, Send, Loader2, Lock, Key, Mail, Building, Tag
} from 'lucide-react';

// --- SERVICES STATIC DATA ---
const services = [
  {
    id: 1,
    title: "IA & Automatisation",
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    desc: "IA Générative, Machine Learning, Agents IA, et automatisation de processus (RPA, n8n).",
    details: ["Agents IA Personnalisés", "Computer Vision", "Automation CRM/Finance", "NLU / NLP"]
  },
  {
    id: 2,
    title: "Transformation Digitale",
    icon: <Rocket className="w-8 h-8 text-purple-400" />,
    desc: "Audit, digitalisation globale, gouvernance IT et gestion du changement.",
    details: ["Diagnostic Digital", "Intégration ERP/CRM", "Stratégie Modernisation", "Documentation & Process"]
  },
  {
    id: 3,
    title: "Dév. Web 3.0 & Mobile",
    icon: <Smartphone className="w-8 h-8 text-pink-400" />,
    desc: "Apps mobiles natives (Kotlin/Swift) et plateformes web complexes (React/Angular).",
    details: ["Flutter / Kotlin / Swift", "Dashboards React/Vue", "Microservices Java/Node", "Blockchain & Web3"]
  },
  {
    id: 4,
    title: "Support IT & MCO",
    icon: <Server className="w-8 h-8 text-green-400" />,
    desc: "Maintenance applicative, infogérance et monitoring pour garantir la continuité.",
    details: ["Support N1/N2/N3", "Monitoring & Observabilité", "TMA", "Infogérance légère"]
  },
  {
    id: 5,
    title: "IoT & Systèmes Connectés",
    icon: <Wifi className="w-8 h-8 text-yellow-400" />,
    desc: "Intégration de capteurs, collecte de données et edge computing.",
    details: ["Prototypes & POC", "Capteurs Physiques", "Data Vizualisation", "Edge Computing"]
  },
  {
    id: 6,
    title: "Formation & Academy",
    icon: <GraduationCap className="w-8 h-8 text-orange-400" />,
    desc: "Montée en compétence de vos équipes sur l'IA, le cloud et le développement.",
    details: ["Programmes Certifiants", "Ateliers IA & Productivité", "Coaching Sur-mesure", "Partenariats Ecoles"]
  }
];

// --- COMPONENTS ---

const Navbar = ({ toggleAdmin, isAdmin, isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm fixed w-full z-50 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Altee<span className="text-blue-400">Tech</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!isAdmin && (
                <>
                  <a href="#expertise" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">Expertises</a>
                  <a href="#formation" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">Formation</a>
                </>
              )}
              
              {isAdmin && isLoggedIn ? (
                 <button 
                   onClick={onLogout}
                   className="border border-red-500 text-red-400 hover:bg-red-900/20 px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-2"
                 >
                   <LogOut size={14}/> Déconnexion
                 </button>
              ) : (
                <button 
                  onClick={toggleAdmin}
                  className="border border-slate-700 hover:bg-slate-800 px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-2"
                >
                  {isAdmin ? <ArrowRight size={14}/> : <Lock size={14}/>}
                  {isAdmin ? 'Retour Site' : 'Espace Staff'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LoginPage = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulation de connexion (le mot de passe "admin123" est stocké dans le backend simulé)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      if (data.success) {
        onLoginSuccess();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center">
            <Lock className="text-blue-400" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Accès Sécurisé</h2>
        <p className="text-center text-slate-500 mb-8 text-sm">Veuillez entrer votre clé d'accès staff.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 py-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <X size={16} /> Mot de passe incorrect
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Connexion'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">Mot de passe démo : "admin123"</p>
        </div>
      </div>
    </div>
  );
};

const LeadDetailView = ({ lead, onClose }) => (
  <div className="fixed inset-0 bg-slate-900 bg-opacity-70 z-50 flex justify-end">
    <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl transform transition-transform duration-300 ease-in-out">
      <div className="sticky top-0 bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center z-10">
        <h3 className="text-xl font-bold text-slate-800">Détails de la Demande</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-800 transition">
          <X size={24} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Résumé de l'interlocuteur */}
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          <h4 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2"><Users size={20}/> Contact</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm text-slate-700"><span className="font-medium">Nom:</span> {lead.name}</p>
            <p className="flex items-center gap-2 text-sm text-slate-700"><Mail size={16} className="text-blue-500 shrink-0" /> {lead.email}</p>
            <p className="flex items-center gap-2 text-sm text-slate-700"><Building size={16} className="text-slate-500 shrink-0" /> {lead.company || 'N/A'}</p>
          </div>
        </div>
        
        {/* Détails de la demande */}
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          <h4 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2"><FileText size={20}/> Sujet</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm text-slate-700">
              <Tag size={16} className="text-purple-500 shrink-0" />
              <span className="font-medium">Type de service:</span> 
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{lead.type}</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-700">
              <Calendar size={16} className="text-slate-500 shrink-0" />
              <span className="font-medium">Date de soumission:</span> {lead.date}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          <h4 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2"><MessageCircle size={20}/> Message du client</h4>
          <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-600 whitespace-pre-wrap">
            {lead.message || "Aucun message fourni."}
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="w-full bg-slate-200 text-slate-800 hover:bg-slate-300 py-3 rounded-lg font-semibold transition"
        >
          Fermer la vue
        </button>
      </div>
    </div>
  </div>
);


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null); // Nouveau state pour le lead sélectionné

  // Récupération des données toutes les 5 secondes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resLeads = await fetch('/api/leads');
        const resTrainings = await fetch('/api/trainings');
        setLeads(await resLeads.json());
        setTrainings(await resTrainings.json());
      } catch (err) { console.error("Erreur de récupération des données admin:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-slate-100 flex">
      <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full z-0">
        <div className="p-6">
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-4">Administration</div>
          <nav className="space-y-2">
            <button onClick={() => { setActiveTab('dashboard'); setSelectedLead(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><BarChart3 size={18} /> Vue d'ensemble</button>
            <button onClick={() => { setActiveTab('leads'); setSelectedLead(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'leads' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><FileText size={18} /> Demandes & Devis</button>
            <button onClick={() => { setActiveTab('training'); setSelectedLead(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'training' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><GraduationCap size={18} /> Inscriptions</button>
          </nav>
        </div>
      </div>
      <div className="flex-1 md:ml-64 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{activeTab === 'dashboard' ? 'Tableau de Bord' : activeTab === 'leads' ? 'Gestion des Devis (Cliquez sur une ligne pour les détails)' : 'Altee Academy'}</h2>
        
        {activeTab === 'dashboard' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <div className="text-slate-500 text-sm mb-1">Total Demandes</div>
                 <div className="text-3xl font-bold text-slate-800">{leads.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <div className="text-slate-500 text-sm mb-1">Étudiants Inscrits</div>
                 <div className="text-3xl font-bold text-slate-800">{trainings.length}</div>
              </div>
           </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                 <tr><th className="px-6 py-3">Nom</th><th className="px-6 py-3">Société</th><th className="px-6 py-3">Sujet</th><th className="px-6 py-3">Date</th></tr>
               </thead>
               <tbody>
                 {leads.map(lead => (
                   <tr 
                     key={lead.id} 
                     className="bg-white border-b hover:bg-slate-50 cursor-pointer transition duration-150"
                     onClick={() => setSelectedLead(lead)}
                   >
                     <td className="px-6 py-4 font-bold">{lead.name}</td>
                     <td className="px-6 py-4">{lead.company}</td>
                     <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{lead.type}</span></td>
                     <td className="px-6 py-4 text-slate-500">{lead.date}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}
        
        {activeTab === 'training' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                 <tr><th className="px-6 py-3">Étudiant</th><th className="px-6 py-3">Cursus</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">État</th></tr>
               </thead>
               <tbody>
                 {trainings.map(t => (
                   <tr key={t.id} className="bg-white border-b hover:bg-slate-50">
                     <td className="px-6 py-4 font-bold">{t.student}</td>
                     <td className="px-6 py-4">{t.course}</td>
                     <td className="px-6 py-4 text-slate-500">{t.date}</td>
                     <td className="px-6 py-4"><span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">{t.progress}</span></td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}

        {/* Affichage des détails du lead sélectionné */}
        {selectedLead && <LeadDetailView lead={selectedLead} onClose={() => setSelectedLead(null)} />}
      </div>
    </div>
  );
};


// Section pour présenter les 6 domaines d'expertise
const ExpertiseSection = () => (
  <div id="expertise" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-4">Nos Domaines d'Expertise</h2>
      <p className="text-center text-lg text-slate-500 mb-12 max-w-2xl mx-auto">Chaque service est propulsé par les dernières avancées en IA et les méthodes de développement les plus fiables.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="flex items-start gap-4 mb-4">
              {service.icon}
              <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
            </div>
            <p className="text-slate-500 mb-4 text-sm">{service.desc}</p>
            <ul className="space-y-2 text-sm">
              {service.details.map((detail, index) => (
                <li key={index} className="flex items-start text-slate-600">
                  <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Call to action for Formation/Academy */}
      <div id="formation" className="mt-16 text-center bg-blue-600 p-8 rounded-xl text-white">
        <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2"><GraduationCap size={24} /> Altee Academy : Accélérez vos talents</h3>
        <p className="text-blue-100 mb-4">Formez vos équipes de demain avec nos parcours certifiants sur mesure en IA et développement avancé.</p>
        <a href="#contact-bottom" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition shadow-md">
          Voir les programmes <ArrowRight size={20} />
        </a>
      </div>
    </div>
  </div>
);


// Composant du formulaire de contact, réutilisable
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', type: 'Transformation Digitale & IA', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // NOTE: Ceci est une simulation de l'envoi au serveur Node.js simulé
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) { setStatus('success'); setFormData({ name: '', company: '', email: '', type: 'Transformation Digitale & IA', message: '' }); }
      else setStatus('error');
    } catch (err) { setStatus('error'); }
    // Clear status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-4 text-center">Démarrez votre projet !</h3>
      <p className="text-center text-slate-600 mb-6">Recevez un audit gratuit ou une proposition sur mesure.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="text" className="w-full border rounded-lg p-3" placeholder="Votre nom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="text" className="w-full border rounded-lg p-3" placeholder="Votre entreprise (facultatif)" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
        <input required type="email" className="w-full border rounded-lg p-3" placeholder="Votre email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <select className="w-full border rounded-lg p-3" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option>Transformation Digitale & IA</option><option>Développement Web/Mobile</option><option>Support IT & MCO</option><option>Formation & Academy</option>
        </select>
        <textarea className="w-full border rounded-lg p-3 h-24 resize-none" placeholder="Décrivez brièvement votre besoin..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
        <button 
          type="submit" 
          disabled={status === 'loading'} 
          className={`w-full font-bold py-3 rounded-lg text-white transition ${status === 'success' ? 'bg-green-600' : status === 'loading' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {status === 'success' ? 'Message Envoyé !' : status === 'loading' ? <Loader2 className="animate-spin mx-auto" size={24} /> : 'Envoyer ma demande'}
        </button>
      </form>
    </div>
  );
};


// --- MAIN APP & HERO ---
const Hero = () => (
  <div className="relative bg-slate-900 text-white pt-32 pb-20 overflow-hidden">
     {/* Fond stylisé pour le Hero */}
     <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor:'#3b82f6'}} /><stop offset="100%" style={{stopColor:'#9333ea'}} /></linearGradient></defs>
            <path d="M0 0h1440v450H0z" fill="#0f172a"/><path d="M1440 450v150H0v-150h1440z" fill="url(#gradient)"/><path d="M1440 450v150H0v-150h1440z" fill="#0f172a" opacity="0.1"/>
        </svg>
    </div>

     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="mb-12 md:mb-0">
        <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-semibold mb-6">🚀 Nouvelle Identité : Agence IA & Digitale</div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">Transformez votre futur avec <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">l'Intelligence Artificielle</span></h1>
        <p className="text-lg text-slate-400 mb-8 max-w-lg">Altee Tech fusionne expertise technique historique et innovation IA pour propulser votre entreprise. Développement, Automatisation, Formation.</p>
        <a href="https://wa.me/261332952189" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2 max-w-xs">
          <MessageCircle size={20} /> Discussion Instantanée
        </a>
      </div>
      
      {/* Le formulaire de contact est ici, à droite */}
      <div className="w-full max-w-md mx-auto">
        <ContactForm />
      </div>
    </div>
  </div>
);

const FooterContactSection = () => (
  <div id="contact-bottom" className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Des questions ? Contactez-nous !</h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        Notre équipe est à votre disposition pour toute information ou accompagnement personnalisé.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <a href="mailto:contact@alteetech.com" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3">
          <Send size={24} /> Envoyer un Email
        </a>
        <a href="tel:+261332952189" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3">
          <Smartphone size={24} /> Appeler
        </a>
      </div>
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('client');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAdmin = () => setView(view === 'client' ? 'admin' : 'client');
  const handleLogout = () => { setIsLoggedIn(false); setView('client'); };

  return (
    <div className="font-sans antialiased text-slate-900 bg-white min-h-screen">
      <Navbar toggleAdmin={toggleAdmin} isAdmin={view === 'admin'} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      {view === 'client' ? (
        <main>
          <Hero />
          <ExpertiseSection /> 
          <FooterContactSection /> 
        </main>
      ) : (
        !isLoggedIn ? <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} /> : <AdminDashboard />
      )}
    </div>
  );
};

export default App;