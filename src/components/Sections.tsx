import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, ArrowUpRight, Terminal, Cpu, Globe, Database, Layout, Server, ChevronRight, Copy, Check, Brain, Clock, MessageSquare, Zap, BookOpen, Briefcase, Instagram, Puzzle, Users, RefreshCw, Heart, Lightbulb, Target, Rocket, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// --- Reusable Components ---

const Card = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, icon: Icon }: { title: string; icon?: React.ElementType }) => (
  <div className="flex items-center gap-3 mb-6">
    {Icon && <Icon className="text-blue-500" size={20} />}
    <h2 className="text-xl font-medium text-white tracking-wide uppercase text-opacity-90">{title}</h2>
  </div>
);

const TechItem = ({ name, url }: { name: string; url: string }) => (
  <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
    <img src={url} alt={name} className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
    <span className="text-xs text-neutral-400 font-mono group-hover:text-white transition-colors text-center">{name}</span>
  </div>
);

const SoftSkillItem = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
      <Icon size={18} />
    </div>
    <span className="text-sm font-medium text-neutral-300">{title}</span>
  </div>
);

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-blue-400 font-mono text-sm">{project.role}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Target size={18} className="text-red-400" /> O Desafio
              </h3>
              <p className="text-neutral-400 leading-relaxed">{project.challenge}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Rocket size={18} className="text-green-400" /> A Solução
              </h3>
              <p className="text-neutral-400 leading-relaxed">{project.solution}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Wrench size={18} className="text-yellow-400" /> Destaques Técnicos
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-neutral-400">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-neutral-400">
                  #{tag}
                </span>
              ))}
            </div>
            
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                Ver Projeto <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('experience.title'), href: '#experience' },
    { name: t('nav.tech'), href: '#tech' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            LUCAS MEZZOMO
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
              aria-label="Toggle Language"
            >
              {language === 'pt' ? (
                <>
                  <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-5 h-auto rounded-sm" />
                  <span className="text-xs font-mono text-neutral-400">PT</span>
                </>
              ) : (
                <>
                  <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-5 h-auto rounded-sm" />
                  <span className="text-xs font-mono text-neutral-400">EN</span>
                </>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/5 rounded-lg"
            >
              {language === 'pt' ? (
                <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-5 h-auto rounded-sm" />
              ) : (
                <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-5 h-auto rounded-sm" />
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#141414] border-b border-white/5 px-6 py-4 space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-neutral-400 hover:text-white text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      <div className="text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
            Lucas Mezzomo
          </h1>
          <p className="text-xl md:text-2xl text-blue-500 font-mono tracking-widest uppercase mb-12">
            {t('hero.role')}
          </p>
          
          <motion.button
            onClick={() => navigate('/portfolio')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-blue-500/50 transition-colors"
          >
            <div className="absolute inset-0 w-0 bg-blue-600/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative flex items-center gap-2 text-white font-medium tracking-wide">
              {t('hero.cta')} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioPage = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lucas.mezzomo@universo.univates.br');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects = [
    {
      title: t('project1.title'),
      shortDesc: t('project1.shortDesc'),
      role: t('project1.role'),
      challenge: t('project1.challenge'),
      solution: t('project1.solution'),
      highlights: [
        t('project1.highlight1'),
        t('project1.highlight2'),
        t('project1.highlight3'),
        t('project1.highlight4'),
        t('project1.highlight5'),
      ],
      tags: ["React", "TypeScript", "Tailwind", "Supabase"],
      link: "https://hotel-finance-os.vercel.app/login"
    },
    {
      title: "Ozark Viking",
      shortDesc: t('project2.desc'),
      role: "Frontend Developer",
      challenge: t('project2.challenge'),
      solution: t('project2.solution'),
      highlights: [
        t('project2.highlight1'),
        t('project2.highlight2'),
        t('project2.highlight3'),
      ],
      tags: ["React", "TypeScript", "Tailwind"],
      link: "https://ozark-viking-website.vercel.app/"
    },
    {
      title: "Dona Ferreirinha",
      shortDesc: t('project3.desc'),
      role: "Frontend Developer",
      challenge: t('project3.challenge'),
      solution: t('project3.solution'),
      highlights: [
        t('project3.highlight1'),
        t('project3.highlight2'),
        t('project3.highlight3'),
      ],
      tags: ["React", "TypeScript", "Tailwind"],
      link: "https://dona-ferreirinha-website.vercel.app/"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative z-10">
      <Navbar />
      
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      <div className="container mx-auto px-4 md:px-6 py-10 pt-32 space-y-20">
        {/* About Section */}
        <section id="about">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <Card className="h-full flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 mb-6 relative group">
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors"></div>
                  <img 
                    src="https://picsum.photos/seed/lucas/400/400" 
                    alt="Lucas Mezzomo" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Lucas Mezzomo</h3>
                <p className="text-blue-400 font-mono text-sm mb-4">{t('about.role')}</p>
                
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-xs text-neutral-400 hover:text-white hover:bg-white/10 transition-all mb-6 group"
                >
                  <Mail size={14} />
                  <span>lucas.mezzomo@universo.univates.br</span>
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                </button>

                <div className="flex gap-4">
                  <a href="https://github.com/mezzomolucas" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-neutral-400 hover:text-white hover:bg-blue-600 transition-all"><Github size={20} /></a>
                  <a href="https://www.linkedin.com/in/mezzomolucas/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-neutral-400 hover:text-white hover:bg-blue-600 transition-all"><Linkedin size={20} /></a>
                  <a href="mailto:lucas.mezzomo@universo.univates.br" className="p-2 bg-white/5 rounded-lg text-neutral-400 hover:text-white hover:bg-blue-600 transition-all"><Mail size={20} /></a>
                </div>
              </Card>
            </div>
            <div className="md:col-span-8">
              <Card className="h-full flex flex-col justify-center">
                <SectionTitle title={t('about.title')} icon={Terminal} />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {t('about.headline').split('soluções digitais')[0]}
                  <span className="text-blue-500">soluções digitais</span>.
                </h2>
                <div className="space-y-4 text-neutral-400 text-lg leading-relaxed">
                  <p>{t('about.desc1')}</p>
                  <p>{t('about.desc2')}</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <SectionTitle title={t('experience.title')} icon={Briefcase} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{t('experience.job1.role')}</h3>
                  <span className="text-xs font-mono text-blue-400 bg-blue-900/20 px-2 py-1 rounded">{t('experience.job1.company')}</span>
                </div>
                <p className="text-neutral-400 leading-relaxed mt-2">
                  {t('experience.job1.desc')}
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{t('experience.job2.role')}</h3>
                  <span className="text-xs font-mono text-blue-400 bg-blue-900/20 px-2 py-1 rounded">{t('experience.job2.company')}</span>
                </div>
                <p className="text-neutral-400 leading-relaxed mt-2">
                  {t('experience.job2.desc')}
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Skills Section (formerly Tech Stack) */}
        <section id="tech">
          <SectionTitle title={t('skills.title')} icon={Cpu} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Frontend */}
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <Layout className="text-blue-400" size={24} />
                  <h3 className="text-lg font-bold text-white">{t('skills.frontend')}</h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  <TechItem name="React" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                  <TechItem name="Next.js" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
                  <TechItem name="Vue.js" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" />
                  <TechItem name="Angular" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" />
                  <TechItem name="TypeScript" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
                  <TechItem name="JavaScript" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                  <TechItem name="Tailwind" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" />
                  <TechItem name="Bootstrap" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" />
                  <TechItem name="Vite" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" />
                  <TechItem name="HTML5" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
                  <TechItem name="CSS3" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
                  <TechItem name="Flutter" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" />
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Backend */}
              <Card>
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <Server className="text-green-400" size={24} />
                  <h3 className="text-lg font-bold text-white">{t('skills.backend')}</h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  <TechItem name="Node.js" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
                  <TechItem name="Python" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
                  <TechItem name="Java" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
                  <TechItem name="Django" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" />
                  <TechItem name="FastAPI" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" />
                </div>
              </Card>

              {/* Database */}
              <Card>
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <Database className="text-purple-400" size={24} />
                  <h3 className="text-lg font-bold text-white">{t('skills.database')}</h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  <TechItem name="MySQL" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />
                  <TechItem name="Supabase" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" />
                  <TechItem name="Firebase" url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Soft Skills Section */}
        <section id="soft-skills">
          <SectionTitle title={t('skills.soft.title')} icon={Brain} />
          <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <SoftSkillItem icon={Check} title={t('skills.soft.org')} />
              <SoftSkillItem icon={MessageSquare} title={t('skills.soft.com')} />
              <SoftSkillItem icon={Puzzle} title={t('skills.soft.prob')} />
              <SoftSkillItem icon={BookOpen} title={t('skills.soft.learn')} />
              <SoftSkillItem icon={Users} title={t('skills.soft.team')} />
              <SoftSkillItem icon={RefreshCw} title={t('skills.soft.adapt')} />
              <SoftSkillItem icon={Heart} title={t('skills.soft.empathy')} />
              <SoftSkillItem icon={Lightbulb} title={t('skills.soft.creative')} />
            </div>
          </Card>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className="flex justify-between items-end mb-8">
            <SectionTitle title={t('projects.title')} icon={Globe} />
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mb-6">
              {t('projects.viewAll')} <ArrowUpRight size={14} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#141414] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-lg text-white group-hover:bg-blue-600 transition-colors">
                    <Cpu size={20} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  {project.shortDesc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-neutral-500">#{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-20">
          <Card className="bg-gradient-to-br from-blue-900/10 to-[#141414]">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">{t('contact.title')}</h2>
              <p className="text-neutral-400 mb-8">
                {t('contact.desc')}
              </p>
              <a href="mailto:lucas.mezzomo@universo.univates.br" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-colors">
                <Mail size={20} />
                {t('contact.email')}
              </a>
            </div>
          </Card>
        </section>

        <Footer />
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-8 border-t border-white/5 mt-10 flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/mezzomolucas/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-500 transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="https://github.com/mezzomolucas" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href="https://www.instagram.com/lmezzomo_/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-pink-500 transition-colors">
          <Instagram size={20} />
        </a>
      </div>
      <p className="text-neutral-600 text-sm font-mono">
        © {new Date().getFullYear()} Lucas Mezzomo. {t('footer.rights')}
      </p>
    </footer>
  );
};

export { Navbar, Hero, PortfolioPage, Footer };
