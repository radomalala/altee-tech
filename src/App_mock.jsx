import React, { useState } from 'react';
import { 
  Brain, 
  Rocket, 
  Smartphone, 
  Server, 
  Wifi, 
  GraduationCap, 
  MessageCircle, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  BarChart3, 
  Users, 
  Calendar, 
  FileText, 
  LogOut,
  Send
} from 'lucide-react';

// --- MOCK DATA ---
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

const mockLeads = [
  { id: 1, name: "Jean Dupont", company: "Logistix SA", type: "Devis IA", date: "19/11/2025", status: "Nouveau" },
  { id: 2, name: "Sophie Martin", company: "StartUp Flow", type: "Formation", date: "18/11/2025", status: "En cours" },
  { id: 3, name: "Marc Alibert", company: "Retail Group", type: "Audit Digital", date: "17/11/2025", status: "Traité" },
];

/* 
const mockAppointments = [
  { id: 1, client: "Tech Corp", time: "14:00", date: "20/11/2025", subject: "Cadrage Projet Mobile" },
  { id: 2, client: "BioSante", time: "10:00", date: "21/11/2025", subject: "Démo Agent IA" },
];
*/

// --- COMPONENTS ---

const Navbar = ({ toggleAdmin, isAdmin }) => {
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
                  <a href="#contact" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition shadow-lg shadow-blue-900/20">Demander un audit</a>
                </>
              )}
              <button 
                onClick={toggleAdmin}
                className="border border-slate-700 hover:bg-slate-800 px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-2"
              >
                {isAdmin ? <LogOut size={14}/> : <Users size={14}/>}
                {isAdmin ? 'Quitter Admin' : 'Espace Staff'}
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#expertise" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Expertises</a>
            <a href="#formation" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Formation</a>
            <button onClick={toggleAdmin} className="text-left w-full text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              {isAdmin ? 'Vue Client' : 'Vue Admin'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <div className="relative bg-slate-900 text-white pt-32 pb-20 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-12 md:mb-0">
        <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-semibold mb-6">
          🚀 Nouvelle Identité : Agence IA & Digitale
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Transformez votre futur avec <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">l'Intelligence Artificielle</span>
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-lg">
          Altee Tech fusionne expertise technique historique et innovation IA pour propulser votre entreprise. Développement, Automatisation, Formation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
            Prendre Rendez-vous <ArrowRight size={20} />
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-medium text-lg border border-slate-700 transition flex items-center justify-center gap-2">
            <MessageCircle size={20} className="text-green-500" /> WhatsApp Direct
          </button>
        </div>
      </div>
      
      {/* Abstract Visualization */}
      <div className="md:w-1/2 flex justify-center relative">
         <div className="relative w-full max-w-md aspect-square bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm shadow-2xl">
            <div className="absolute top-4 left-4 w-16 h-1 bg-red-500 rounded-full"></div>
            <div className="absolute top-6 left-4 w-8 h-1 bg-yellow-500 rounded-full"></div>
            
            <div className="h-full w-full flex flex-col justify-between text-slate-300 font-mono text-sm">
              <div className="space-y-2">
                 <div className="flex justify-between"><span className="text-blue-400">import</span> <span>AlteeIntelligence;</span></div>
                 <div className="flex justify-between"><span className="text-purple-400">class</span> <span>DigitalTransformation</span> {'{'}</div>
                 <div className="pl-4 text-slate-500">// Optimisation des processus...</div>
                 <div className="pl-4">launchAI_Agents(<span className="text-green-400">true</span>);</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-900 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Gain Productivité</div>
                  <div className="text-2xl font-bold text-green-400">+350%</div>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Coût Ops</div>
                  <div className="text-2xl font-bold text-blue-400">-40%</div>
                </div>
              </div>
              
              <div className="text-right text-purple-400">{'}'}</div>
            </div>
         </div>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ service }) => (
  <div className="bg-white hover:bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition border border-slate-100 group">
    <div className="mb-4 p-3 bg-slate-50 rounded-lg inline-block group-hover:bg-white group-hover:shadow-sm transition">
      {service.icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
    <p className="text-slate-600 mb-4 text-sm">{service.desc}</p>
    <ul className="space-y-2">
      {service.details.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-slate-500">
          <CheckCircle size={14} className="mt-1 text-blue-500 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="pt-16 min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full z-0">
        <div className="p-6">
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-4">Administration</div>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
            >
              <BarChart3 size={18} /> Vue d'ensemble
            </button>
            <button 
               onClick={() => setActiveTab('leads')}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
            >
              <FileText size={18} /> Demandes & Devis
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'calendar' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
            >
              <Calendar size={18} /> Rendez-vous
            </button>
            <button 
              onClick={() => setActiveTab('training')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'training' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
            >
              <GraduationCap size={18} /> Inscriptions Formations
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 md:ml-64 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {activeTab === 'dashboard' && 'Tableau de Bord'}
          {activeTab === 'leads' && 'Gestion des Devis'}
          {activeTab === 'calendar' && 'Agenda des Experts'}
          {activeTab === 'training' && 'Inscriptions Academy'}
        </h2>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="text-slate-500 text-sm mb-1">Leads ce mois</div>
              <div className="text-3xl font-bold text-slate-800">42</div>
              <div className="text-green-500 text-xs mt-2 flex items-center gap-1"><Rocket size={12}/> +12% vs n-1</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="text-slate-500 text-sm mb-1">RDV Confirmés</div>
              <div className="text-3xl font-bold text-slate-800">18</div>
              <div className="text-blue-500 text-xs mt-2">Agenda semaine prochaine complet</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="text-slate-500 text-sm mb-1">Inscrits Formation</div>
              <div className="text-3xl font-bold text-slate-800">156</div>
              <div className="text-purple-500 text-xs mt-2">Nouveau batch IA lancé</div>
            </div>
          </div>
        )}

        {/* Example Table for Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="font-semibold text-slate-700">Dernières activités</h3>
             <button className="text-xs bg-white border border-slate-300 px-3 py-1 rounded text-slate-600 hover:bg-slate-50">Exporter CSV</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                 <tr>
                   <th className="px-6 py-3">Client / Prospect</th>
                   <th className="px-6 py-3">Société</th>
                   <th className="px-6 py-3">Type</th>
                   <th className="px-6 py-3">Date</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {mockLeads.map((lead) => (
                   <tr key={lead.id} className="bg-white border-b hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                     <td className="px-6 py-4 text-slate-600">{lead.company}</td>
                     <td className="px-6 py-4">
                       <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{lead.type}</span>
                     </td>
                     <td className="px-6 py-4 text-slate-500">{lead.date}</td>
                     <td className="px-6 py-4">
                       <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${lead.status === 'Nouveau' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                         {lead.status}
                       </span>
                     </td>
                     <td className="px-6 py-4">
                       <button className="text-blue-600 hover:underline">Voir détails</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => (
  <div id="contact" className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Prêt à innover ?</h2>
          <p className="text-slate-400 mb-8">
            Discutons de vos enjeux. Que ce soit pour une application mobile, une automatisation complexe ou la formation de vos équipes, nos experts sont là.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-blue-400">
                <MessageCircle />
              </div>
              <div>
                <div className="text-sm text-slate-500">Chat Direct</div>
                <div className="font-semibold">WhatsApp Business</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-green-400">
                <Calendar />
              </div>
              <div>
                <div className="text-sm text-slate-500">Calendrier</div>
                <div className="font-semibold">Réserver un créneau d'audit</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl">
          <h3 className="text-xl font-bold mb-4">Demande de Devis / Contact</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Société</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Entreprise" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="nom@societe.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sujet</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                 <option>Transformation Digitale & IA</option>
                 <option>Développement Web/Mobile</option>
                 <option>Formation & Academy</option>
                 <option>Support IT</option>
              </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
               <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-24" placeholder="Décrivez votre projet..."></textarea>
            </div>
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
              Envoyer la demande <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const WhatsAppFloat = () => (
  <a 
    href="https://wa.me/1234567890" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-bounce hover:animate-none flex items-center gap-2"
  >
    <MessageCircle size={28} fill="white" />
    <span className="hidden md:inline font-semibold">Discuter</span>
  </a>
);

// --- MAIN APP ---

const App = () => {
  const [view, setView] = useState('client'); // 'client' or 'admin'

  // Simulate auth check or view switching
  const toggleAdmin = () => {
    setView(view === 'client' ? 'admin' : 'client');
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-white min-h-screen">
      <Navbar toggleAdmin={toggleAdmin} isAdmin={view === 'admin'} />
      
      {view === 'client' ? (
        <main>
          <Hero />
          
          {/* Services Section */}
          <section id="expertise" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Nos Piliers</h2>
                <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  L'Expertise 360° Altee Tech
                </h3>
                <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                  De l'audit stratégique au développement technique, nous maîtrisons toute la chaîne de valeur digitale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>

          {/* Formation Highlight */}
          <section id="formation" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-900 skew-y-3 origin-bottom-right transform translate-y-20 -z-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
               <div className="md:w-1/2">
                 <img 
                   src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                   alt="Formation Tech" 
                   className="rounded-2xl shadow-2xl"
                 />
               </div>
               <div className="md:w-1/2">
                 <h2 className="text-3xl font-bold text-slate-900 mb-6">Altee Academy : Transmettez le savoir</h2>
                 <p className="text-lg text-slate-600 mb-6">
                   L'outil n'est rien sans la maîtrise. Nous formons vos équipes aux technologies de demain.
                 </p>
                 <ul className="space-y-4 mb-8">
                   <li className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-slate-100">
                     <div className="bg-orange-100 p-2 rounded text-orange-600"><GraduationCap size={20}/></div>
                     <div>
                       <div className="font-bold">Formation Académique</div>
                       <div className="text-sm text-slate-500">Pour étudiants & reconversion</div>
                     </div>
                   </li>
                   <li className="flex items-center gap-3 bg-white p-3 rounded shadow-sm border border-slate-100">
                     <div className="bg-blue-100 p-2 rounded text-blue-600"><Rocket size={20}/></div>
                     <div>
                       <div className="font-bold">Coaching Sur-Mesure</div>
                       <div className="text-sm text-slate-500">Intra-entreprise, focus sur vos outils</div>
                     </div>
                   </li>
                 </ul>
                 <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-orange-500/30">
                   Voir le catalogue des formations
                 </button>
               </div>
            </div>
          </section>

          <ContactSection />
          <WhatsAppFloat />
          
          <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
               <div>
                 <div className="font-bold text-white text-xl mb-4">Altee<span className="text-blue-500">Tech</span></div>
                 <p className="text-sm">Agence experte en transformation digitale et intelligence artificielle.</p>
               </div>
               <div>
                 <div className="font-bold text-white mb-4">Services</div>
                 <ul className="space-y-2 text-sm">
                   <li><a href="#" className="hover:text-blue-400">IA & Automation</a></li>
                   <li><a href="#" className="hover:text-blue-400">Développement Web/Mobile</a></li>
                   <li><a href="#" className="hover:text-blue-400">Consulting & Audit</a></li>
                 </ul>
               </div>
               <div>
                 <div className="font-bold text-white mb-4">Société</div>
                 <ul className="space-y-2 text-sm">
                   <li><a href="#" className="hover:text-blue-400">À propos</a></li>
                   <li><a href="#" className="hover:text-blue-400">Carrières</a></li>
                   <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                 </ul>
               </div>
               <div>
                 <div className="font-bold text-white mb-4">Légal</div>
                 <ul className="space-y-2 text-sm">
                   <li><a href="#" className="hover:text-blue-400">Mentions Légales</a></li>
                   <li><a href="#" className="hover:text-blue-400">Politique de confidentialité</a></li>
                 </ul>
               </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-900 text-center text-sm">
              © 2025 Altee Tech. Tous droits réservés.
            </div>
          </footer>
        </main>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default App;