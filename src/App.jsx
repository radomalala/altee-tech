import React, { useState } from 'react';
import { 
  Brain, Rocket, Smartphone, Server, Wifi, GraduationCap, 
  MessageCircle, CheckCircle, ArrowRight, Send, Loader2, Menu, X, Shield
} from 'lucide-react';

// Inquiry Modal Component
const InquiryModal = ({ isOpen, onClose, title, category, description }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', request: '' });
  const [status, setStatus] = useState('idle');
  const API_BASE = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, title, category, description })
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => { onClose(); setStatus('idle'); setFormData({ name: '', email: '', phone: '', request: '' }); }, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-4">{category}</p>
        <p className="text-slate-700 mb-6">{description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="text" className="w-full border rounded-lg p-3" placeholder="Votre nom ou raison sociale" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <input required type="email" className="w-full border rounded-lg p-3" placeholder="Votre email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <input required type="tel" className="w-full border rounded-lg p-3" placeholder="Votre téléphone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          <textarea required className="w-full border rounded-lg p-3 h-24 resize-none" placeholder="Votre demande" value={formData.request} onChange={e => setFormData({ ...formData, request: e.target.value })}></textarea>
          <button type="submit" disabled={status === 'loading'} className={`w-full font-bold py-3 rounded-lg text-white transition ${status === 'success' ? 'bg-green-600' : status === 'loading' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {status === 'success' ? 'Demande Envoyée !' : status === 'loading' ? <Loader2 className="animate-spin mx-auto" size={24} /> : 'Envoyer ma demande'}
          </button>
        </form>
      </div>
    </div>
  );
};

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

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm fixed w-full z-50 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { window.scrollTo(0,0); setOpen(false); }}>
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight">Altee<span className="text-blue-400">Tech</span></span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#expertise" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">Expertises</a>
              <a href="#formation" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">Formation</a>
            </div>
          </div>

          <button
            aria-label="Ouvrir le menu"
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3">
            <div className="mt-2 space-y-1 border-t border-slate-800 pt-2">
              <a onClick={() => setOpen(false)} href="#expertise" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">Expertises</a>
              <a onClick={() => setOpen(false)} href="#formation" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">Formation</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Front-only: removed Login/Admin components


// Section pour présenter les 6 domaines d'expertise
const ExpertiseSection = () => {
  const [modal, setModal] = useState({ isOpen: false, title: '', category: '', description: '' });

  const openModal = (service) => {
    setModal({
      isOpen: true,
      title: service.title,
      category: 'Service',
      description: service.desc
    });
  };

  return (
  <>
    <InquiryModal {...modal} onClose={() => setModal({ ...modal, isOpen: false })} />
    <div id="expertise" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-4">Nos Domaines d'Expertise</h2>
      <p className="text-center text-lg text-slate-500 mb-12 max-w-2xl mx-auto">Chaque service est propulsé par les dernières avancées en IA et les méthodes de développement les plus fiables.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service) => (
          <div key={service.id} onClick={() => openModal(service)} className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-slate-100 cursor-pointer">
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
      <div id="academy-cta" className="mt-12 sm:mt-16 text-center bg-blue-600 p-6 sm:p-8 rounded-xl text-white scroll-mt-24">
        <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2"><GraduationCap size={24} /> Altee Academy : Accélérez vos talents</h3>
        <p className="text-blue-100 mb-4">Formez vos équipes de demain avec nos parcours certifiants sur mesure en IA, DevOps et développement.</p>
        <a href="#formation" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition shadow-md">
          Voir les programmes <ArrowRight size={20} />
        </a>
      </div>
    </div>
  </div>
  </>
  );
};


// Front-only: contact form removed for now
// Contact form (uses local SQLite API when running server.js)
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Transformation Digitale & IA', message: '', hp: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const API_BASE = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

  const validate = (data) => {
    const next = { name: '', email: '', message: '' };
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email || '').trim());
    if (!data.name || String(data.name).trim().length < 2) next.name = 'Veuillez indiquer un nom valide (≥ 2 caractères).';
    if (!emailOk) next.email = "Veuillez indiquer un email valide (ex: nom@domaine.com).";
    if (!data.message || String(data.message).trim().length < 10) next.message = 'Décrivez votre besoin en quelques mots (≥ 10 caractères).';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', type: 'Transformation Digitale & IA', message: '', hp: '' });
        setErrors({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-200">
      <h3 className="text-2xl font-bold mb-4 text-center">Démarrez votre projet !</h3>
      <p className="text-center text-slate-600 mb-6">Recevez un audit gratuit ou une proposition sur mesure.</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot field (anti-bot) */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
          <label>
            Ne pas remplir
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              value={formData.hp}
              onChange={e => setFormData({ ...formData, hp: e.target.value })}
            />
          </label>
        </div>
        <div>
          <input
            type="text"
            className={`w-full border rounded-lg p-3 ${touched.name && errors.name ? 'border-red-500' : ''}`}
            placeholder="Votre nom ou raison sociale"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => { setTouched(t => ({ ...t, name: true })); setErrors(prev => ({ ...prev, ...validate({ ...formData, name: formData.name }) })); }}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby="name-error"
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            className={`w-full border rounded-lg p-3 ${touched.email && errors.email ? 'border-red-500' : ''}`}
            placeholder="Votre email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => { setTouched(t => ({ ...t, email: true })); setErrors(prev => ({ ...prev, ...validate({ ...formData, email: formData.email }) })); }}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby="email-error"
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <select className="w-full border rounded-lg p-3" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option>Transformation Digitale & IA</option><option>Développement Web/Mobile</option><option>Support IT & MCO</option><option>Formation & Academy</option>
        </select>
        <div>
          <textarea
            className={`w-full border rounded-lg p-3 h-24 resize-none ${touched.message && errors.message ? 'border-red-500' : ''}`}
            placeholder="Décrivez brièvement votre besoin..."
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            onBlur={() => { setTouched(t => ({ ...t, message: true })); setErrors(prev => ({ ...prev, ...validate({ ...formData, message: formData.message }) })); }}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby="message-error"
          />
          {touched.message && errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>
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
  <div className="relative bg-slate-900 text-white pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
     {/* Fond stylisé pour le Hero */}
     <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor:'#3b82f6'}} /><stop offset="100%" style={{stopColor:'#9333ea'}} /></linearGradient></defs>
            <path d="M0 0h1440v450H0z" fill="#0f172a"/><path d="M1440 450v150H0v-150h1440z" fill="url(#gradient)"/><path d="M1440 450v150H0v-150h1440z" fill="#0f172a" opacity="0.1"/>
        </svg>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
     <div className="mb-12 md:mb-0">
        <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-semibold mb-6">🚀 Nouvelle Identité : Agence IA & Digitale</div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">Transformez votre futur avec <span className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">l'Intelligence Artificielle</span></h1>
        <p className="text-lg text-slate-400 mb-8 max-w-lg">Altee Tech fusionne expertise technique historique et innovation IA pour propulser votre entreprise. Développement, Automatisation, Formation.</p>
        {/* CTA WhatsApp retirée du bandeau */}
      </div>
      
      <div className="w-full max-w-md mx-auto md:mx-0">
        <ContactForm />
      </div>
    </div>
  </div>
);

const FooterContactSection = () => (
  <div id="contact-bottom" className="bg-slate-900 text-white py-16 sm:py-20 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Des questions ? Contactez-nous !</h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        Notre équipe est à votre disposition pour toute information ou accompagnement personnalisé.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <a href="mailto:contact@alteetech.com" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3">
          <Send size={24} /> Envoyer un Email
        </a>
        <a href="https://wa.me/261332952189" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3">
          <MessageCircle size={24} /> WhatsApp
        </a>
      </div>
    </div>
  </div>
);

// Section Formation (programmes Academy)
const FormationSection = () => {
  const [modal, setModal] = useState({ isOpen: false, title: '', category: '', description: '' });

  const openModal = (program) => {
    setModal({
      isOpen: true,
      title: program.title,
      category: 'Formation',
      description: program.bullets.join(' • ')
    });
  };

  const programs = [
    {
      title: 'Programmation Web & Mobile',
      icon: <Smartphone className="w-7 h-7 text-pink-400" />,
      bullets: ['Front-end (React) & Back-end (Node)', 'Mobile: Flutter / Kotlin / Swift', 'Projets encadrés & bonnes pratiques']
    },
    {
      title: 'DevOps',
      icon: <Server className="w-7 h-7 text-green-400" />,
      bullets: ['CI/CD, Docker & Containers', 'IaC (Terraform) & Cloud', 'Observabilité & SRE bases']
    },
    {
      title: 'Intelligence Artificielle',
      icon: <Brain className="w-7 h-7 text-blue-400" />,
      bullets: ['IA Générative & Agents', 'ML pratique: data → modèle → déploiement', 'Ethique & bonnes pratiques']
    },
    {
      title: 'Métiers en ligne',
      icon: <GraduationCap className="w-7 h-7 text-orange-400" />,
      bullets: ['Productivité & Outils no-code', 'Freelance & personal branding', 'Workflow pro à distance']
    },
    {
      title: 'Support IT',
      icon: <Wifi className="w-7 h-7 text-yellow-400" />,
      bullets: ['Helpdesk N1 / N2', 'ITIL, supervision & MCO', 'Sécurité opérationnelle de base']
    },
    {
      title: 'Cybersécurité & Ethical Hacking',
      icon: <Shield className="w-7 h-7 text-purple-400" />,
      bullets: ['Principes de sécurité & durcissement', 'Tests d’intrusion (intro) & outils', 'Gestion des risques & sensibilisation']
    }
  ];

  return (
    <>
      <InquiryModal {...modal} onClose={() => setModal({ ...modal, isOpen: false })} />
      <section id="formation" className="py-16 sm:py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Programmes de Formation</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Des parcours concrets, orientés projet et employabilité, avec accompagnement par des experts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((p, i) => (
            <div key={i} onClick={() => openModal(p)} className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition shadow-sm hover:shadow-md p-6 cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                {p.icon}
                <h3 className="text-lg font-bold text-slate-800">{p.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {p.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start"><CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 shrink-0" /> {b}</li>
                ))}
              </ul>
              <div className="mt-5 flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); openModal(p); }} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  Demander le programme <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

const App = () => {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ExpertiseSection />
        <FormationSection />
        <FooterContactSection />
      </main>
    </div>
  );
};

export default App;