import React, { useState, useRef, useEffect } from 'react';
import {
  Mail, ExternalLink,
  ChevronRight, Copy, Check, Instagram,
  MessageCircle, Menu, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import fotoLucas from '../assets/foto-lucas.jpeg';
import logoDark from '../assets/02-interligado-pb-dark.svg';
import logoLight from '../assets/02-interligado-pb-light.svg';
import TextType from './TextType';

// ─── Mobile hook ──────────────────────────────────────────────────────────────

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
};

// ─── Grain overlay ────────────────────────────────────────────────────────────

const GrainOverlay = () => (
  <div className="grain-overlay" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="p-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#p-noise)" />
    </svg>
  </div>
);

// ─── Ring background ──────────────────────────────────────────────────────────

const RingBackground = ({ isDark }: { isDark: boolean }) => {
  const dim  = isDark ? 'rgba(0,200,100,0.06)'  : 'rgba(37,99,235,0.06)';
  const arc  = isDark ? 'rgba(0,200,100,0.28)'  : 'rgba(37,99,235,0.28)';
  const arc2 = isDark ? 'rgba(0,200,100,0.10)'  : 'rgba(37,99,235,0.10)';
  return (
    <div aria-hidden="true" style={{
      position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {[88, 62, 38, 18].map(s => (
        <div key={s} style={{ position: 'absolute', width: `${s}vmin`, height: `${s}vmin`, borderRadius: '50%', border: `1px solid ${dim}` }} />
      ))}
      <div className="ring-cw" style={{ position: 'absolute', width: '88vmin', height: '88vmin', borderRadius: '50%', border: '1px solid transparent', borderTopColor: arc, borderRightColor: arc2 }} />
      <div className="ring-ccw" style={{ position: 'absolute', width: '62vmin', height: '62vmin', borderRadius: '50%', border: '1px solid transparent', borderBottomColor: arc, borderLeftColor: arc2 }} />
      <div className="ring-cw-fast" style={{ position: 'absolute', width: '38vmin', height: '38vmin', borderRadius: '50%', border: '1px solid transparent', borderTopColor: arc2, borderLeftColor: arc }} />
    </div>
  );
};

// ─── Project modal ────────────────────────────────────────────────────────────

const ProjectModal = ({ project, onClose, isDark }: { project: any; onClose: () => void; isDark: boolean }) => {
  const { t }  = useLanguage();
  const bg     = isDark ? '#0a0a0a' : '#fafaf8';
  const text   = isDark ? '#f0f0f0' : '#0a0a0a';
  const muted  = isDark ? 'rgba(240,240,240,0.42)' : 'rgba(10,10,10,0.45)';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const lbl: React.CSSProperties = { fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '0.5rem' };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(24px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: bg, border: `1px solid ${border}`, width: '100%', maxWidth: '540px', maxHeight: '88vh', overflowY: 'auto', padding: 'clamp(1.5rem, 4vw, 3rem)', position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: muted, fontSize: '1.4rem', lineHeight: 1 }}>×</button>
        <p style={lbl}>{project.role}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)', fontWeight: 200, letterSpacing: '-0.02em', color: text, lineHeight: 1.1, marginBottom: '2rem' }}>{project.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{ l: t('modal.challenge'), t: project.challenge }, { l: t('modal.solution'), t: project.solution }].map(({ l, t: body }) => (
            <div key={l}>
              <p style={lbl}>{l}</p>
              <p style={{ fontSize: '0.875rem', fontWeight: 300, color: muted, lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
          <div>
            <p style={lbl}>{t('modal.highlights')}</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {project.highlights.map((h: string, i: number) => (
                <li key={i} style={{ fontSize: '0.875rem', fontWeight: 300, color: muted, lineHeight: 1.75, paddingLeft: '1.25rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${border}`, paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tags.map((tag: string) => (
              <span key={tag} style={{ fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', border: `1px solid ${border}`, padding: '0.2rem 0.6rem', color: muted }}>{tag}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: text, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              {t('modal.viewProject')} <ExternalLink size={11} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const navigate  = useNavigate();
  const { t }     = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const c = {
    bg:     isDark ? '#000000'                : '#f0ebe0',
    text:   isDark ? '#f0f0f0'                : '#0a0a0a',
    muted:  isDark ? 'rgba(240,240,240,0.38)' : 'rgba(10,10,10,0.40)',
    border: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
    accent: isDark ? '#00c96d'                : '#2563eb',
  };
  const ease = 'cubic-bezier(0.25,0.1,0.25,1)';
  const meta: React.CSSProperties = { fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted };

  return (
    <div style={{ position: 'fixed', inset: 0, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <RingBackground isDark={isDark} />
      <GrainOverlay />

      {/* Frame border */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: '18px', border: `1px solid ${c.border}`, pointerEvents: 'none', zIndex: 9999 }} />

      {/* DARK / LIGHT vertical labels */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0', pointerEvents: 'none' }}>
        {(['DARK', 'LIGHT'] as const).map(lbl => (
          <button key={lbl} onClick={toggleTheme} style={{
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            fontSize: '0.58rem', letterSpacing: '0.18em', color: c.text,
            opacity: (lbl === 'DARK') === isDark ? 0.7 : 0.22,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0 13px', pointerEvents: 'auto',
            transition: `opacity 0.3s ${ease}`,
          }}>{lbl}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 7.5rem)', fontWeight: 200,
            letterSpacing: '-0.04em', color: c.text, lineHeight: 0.9,
            marginBottom: '1.5rem',
          }}>
            Lucas<br />Mezzomo
          </h1>

          {/* Role */}
          <p style={{ ...meta, color: c.accent, marginBottom: '3rem' }}>
            {t('hero.role')}
          </p>

          {/* CTA */}
          <motion.button
            onClick={() => navigate('/portfolio')}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: c.text, background: 'none',
              border: `1px solid ${c.border}`,
              padding: '0.75rem 1.75rem', cursor: 'pointer',
              transition: `border-color 0.3s ${ease}, color 0.3s ${ease}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.text; }}
          >
            {t('hero.cta')}
            <ChevronRight size={14} strokeWidth={1.5} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Portfolio Page ───────────────────────────────────────────────────────────

const PortfolioPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [copied, setCopied]                   = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activePage, setActivePage]           = useState('home');
  const [menuOpen, setMenuOpen]               = useState(false);
  const projectsRef                           = useRef<HTMLDivElement>(null);

  const roles = ['web', 'criativo', 'freelancer', 'fullstack'];

  // ── Color tokens ─────────────────────────────────────────────────────────────
  const c = {
    bg:     isDark ? '#000000'                : '#f0ebe0',
    text:   isDark ? '#f0f0f0'                : '#0a0a0a',
    muted:  isDark ? 'rgba(240,240,240,0.38)' : 'rgba(10,10,10,0.40)',
    border: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
    accent: isDark ? '#00c96d'                : '#2563eb',
  };

  const cssVars = {
    '--color-bg': c.bg, '--color-text': c.text,
    '--color-muted': c.muted, '--color-border': c.border,
  } as React.CSSProperties;

  // ── Data ──────────────────────────────────────────────────────────────────────
  const projects = [
    {
      title: t('project1.title'), shortDesc: t('project1.shortDesc'), role: t('project1.role'),
      challenge: t('project1.challenge'), solution: t('project1.solution'),
      highlights: [t('project1.highlight1'), t('project1.highlight2'), t('project1.highlight3'), t('project1.highlight4'), t('project1.highlight5')],
      tags: ['React', 'TypeScript', 'Tailwind', 'Supabase'], link: 'https://hotel-finance-os.vercel.app/login',
    },
    {
      title: 'Ozark Viking', shortDesc: t('project2.desc'), role: 'Frontend Developer',
      challenge: t('project2.challenge'), solution: t('project2.solution'),
      highlights: [t('project2.highlight1'), t('project2.highlight2'), t('project2.highlight3')],
      tags: ['React', 'TypeScript', 'Tailwind'], link: 'https://ozark-viking-website.vercel.app/',
    },
    {
      title: 'Dona Ferreirinha', shortDesc: t('project3.desc'), role: 'Frontend Developer',
      challenge: t('project3.challenge'), solution: t('project3.solution'),
      highlights: [t('project3.highlight1'), t('project3.highlight2'), t('project3.highlight3')],
      tags: ['React', 'TypeScript', 'Tailwind'], link: 'https://dona-ferreirinha-website.vercel.app/',
    },
    {
      title: 'Marta Gonçalves', shortDesc: t('project4.desc'), role: 'Frontend Developer',
      challenge: t('project4.challenge'), solution: t('project4.solution'),
      highlights: [t('project4.highlight1'), t('project4.highlight2'), t('project4.highlight3')],
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind'], link: 'https://marta-goncalves-website.vercel.app/',
    },
  ];

  const allTechs   = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind', 'Bootstrap', 'Vite', 'HTML5', 'CSS3', 'Flutter', 'Node.js', 'Python', 'Java', 'MySQL', 'Supabase', 'Firebase'];
  const softSkills = [t('skills.soft.org'), t('skills.soft.com'), t('skills.soft.prob'), t('skills.soft.learn'), t('skills.soft.team'), t('skills.soft.adapt'), t('skills.soft.empathy'), t('skills.soft.creative')];

  const navItems = [
    { id: 'home',       label: 'Home' },
    { id: 'experience', label: t('experience.title') },
    { id: 'skills',     label: t('nav.tech') },
    { id: 'projects',   label: t('nav.projects') },
    { id: 'contact',    label: t('nav.contact') },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lucas.mezzomo@universo.univates.br');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const go = (id: string) => { setActivePage(id); setMenuOpen(false); };

  const ease = 'cubic-bezier(0.25,0.1,0.25,1)';
  const meta: React.CSSProperties = { fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.muted };
  const btnBase: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: `opacity 0.25s ${ease}` };

  // ── Pages ─────────────────────────────────────────────────────────────────────

  const PageHome = () => isMobile ? (
    /* ── Mobile home: photo top, text below ── */
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
        style={{ position: 'relative', height: '38%', flexShrink: 0, overflow: 'hidden' }}>
        <img src={fotoLucas} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: isDark ? 'grayscale(100%) brightness(0.38) contrast(1.1)' : 'grayscale(40%) brightness(0.8)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${c.bg} 0%, transparent 22%, transparent 60%, ${c.bg} 100%)` }} />
      </motion.div>
      <div style={{ flex: 1, padding: '0.75rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 9vw, 3rem)', fontWeight: 200, letterSpacing: '-0.03em', color: c.text, lineHeight: 0.92, marginBottom: '0.65rem' }}>
            Lucas<br />Mezzomo
          </h1>
          <p style={{ ...meta, marginBottom: '1rem' }}>
            Desenvolvedor <span style={{ color: c.accent }}>web</span>
          </p>
          <p style={{ fontSize: '0.78rem', fontWeight: 300, color: c.muted, lineHeight: 1.75, marginBottom: '1.1rem' }}>{t('about.desc1')}</p>
          <button onClick={handleCopyEmail}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.muted, background: 'none', border: `1px solid ${c.border}`, padding: '0.32rem 0.65rem', cursor: 'pointer' }}>
            <Mail size={10} /> Email {copied ? <Check size={10} /> : <Copy size={10} />}
          </button>
        </motion.div>
      </div>
    </div>
  ) : (
    /* ── Desktop home: photo left, text right ── */
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'absolute', left: 0, top: 0, width: '32%', height: '100%', pointerEvents: 'none' }}>
        <img src={fotoLucas} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: isDark ? 'grayscale(100%) brightness(0.40) contrast(1.1)' : 'grayscale(50%) brightness(0.80) contrast(1.05)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 30%, ${c.bg} 100%)` }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${c.bg} 0%, transparent 18%, transparent 72%, ${c.bg} 100%)` }} />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', padding: '2rem 3rem 3rem', textAlign: 'right' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}>
          <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)', fontWeight: 200, letterSpacing: '-0.03em', color: c.text, lineHeight: 0.92, marginBottom: '1rem' }}>
            Lucas<br />Mezzomo
          </h1>
          <p style={{ ...meta, marginBottom: '1.75rem' }}>
            Desenvolvedor <span style={{ color: c.accent }}>web</span> &nbsp;·&nbsp; Lajeado, RS
          </p>
          <div style={{ maxWidth: '38ch', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: 'auto' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 300, color: c.muted, lineHeight: 1.8 }}>{t('about.desc1')}</p>
            <p style={{ fontSize: '0.8rem', fontWeight: 300, color: c.muted, lineHeight: 1.8 }}>{t('about.desc2')}</p>
          </div>
          <button onClick={handleCopyEmail}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginTop: '1.6rem', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.muted, background: 'none', border: `1px solid ${c.border}`, padding: '0.38rem 0.75rem', cursor: 'pointer', transition: `border-color 0.3s ${ease}, color 0.3s ${ease}` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.text; e.currentTarget.style.color = c.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.muted; }}>
            <Mail size={10} /> lucas.mezzomo@universo.univates.br {copied ? <Check size={10} /> : <Copy size={10} />}
          </button>
        </motion.div>
      </div>
    </div>
  );

  const pad = isMobile
    ? { padding: '1.5rem 1.5rem 2rem', paddingSmall: '1.25rem 1.5rem 1.75rem' }
    : { padding: '3rem 3.5rem 3rem 2rem', paddingSmall: '2.5rem 3.5rem 2.5rem 2rem' };

  const PageExperience = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isMobile ? 'flex-start' : 'flex-end', height: '100%', padding: pad.padding, overflow: 'hidden', textAlign: isMobile ? 'left' : 'right' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} style={{ width: '100%' }}>
        <p style={{ ...meta, marginBottom: isMobile ? '1.75rem' : '3rem' }}>02 — {t('experience.title')}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2rem' : '3.5rem' }}>
          {[
            { role: t('experience.job1.role'), company: t('experience.job1.company'), desc: t('experience.job1.desc') },
            { role: t('experience.job2.role'), company: t('experience.job2.company'), desc: t('experience.job2.desc') },
          ].map((job, i) => (
            <div key={i}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 3rem)', fontWeight: 200, letterSpacing: '-0.02em', color: c.text, lineHeight: 1.05, marginBottom: '0.35rem' }}>{job.role}</h2>
              <p style={{ ...meta, marginBottom: '0.75rem' }}>{job.company}</p>
              <p style={{ fontSize: '0.825rem', fontWeight: 300, color: c.muted, lineHeight: 1.75, maxWidth: '46ch', marginLeft: isMobile ? '0' : 'auto' }}>{job.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const PageSkills = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isMobile ? 'flex-start' : 'flex-end', height: '100%', padding: pad.paddingSmall, overflow: 'hidden', textAlign: isMobile ? 'left' : 'right' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} style={{ width: '100%' }}>
        <p style={{ ...meta, marginBottom: '1.5rem' }}>03 — {t('skills.title')}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end', gap: '0.32rem', marginBottom: '1.5rem' }}>
          {allTechs.map((name, i) => (
            <motion.span key={name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: i * 0.02 }}
              style={{ fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase', border: `1px solid ${c.border}`, padding: '0.2rem 0.5rem', color: c.muted }}>
              {name}
            </motion.span>
          ))}
        </div>
        <p style={{ ...meta, marginBottom: '0.75rem' }}>{t('skills.soft.title')}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end', gap: '0.32rem' }}>
          {softSkills.map((sk, i) => (
            <span key={i} style={{ fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase', border: `1px solid ${c.border}`, padding: '0.2rem 0.5rem', color: c.muted }}>{sk}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const PageProjects = () => (
    <div ref={projectsRef} className="portfolio-scroll" style={{ height: '100%', overflowY: 'auto', padding: isMobile ? '1.5rem 1.5rem 3rem' : '3rem 3.5rem 4rem 2rem', textAlign: isMobile ? 'left' : 'right' }}>
      <p style={{ ...meta, marginBottom: isMobile ? '1.75rem' : '3rem' }}>04 — {t('projects.title')}</p>
      <div>
        {projects.map((project, idx) => (
          <div key={idx} className="project-entry" onClick={() => setSelectedProject(project)} style={{ marginBottom: '2rem' }}>
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, root: projectsRef }}
              transition={{ duration: 0.9, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 200, letterSpacing: '-0.02em', color: c.text, lineHeight: 1.05, display: 'block' }}
            >
              {project.title}
            </motion.h2>
            <div className="project-meta" style={{ marginTop: '0.35rem' }}>
              <span style={{ ...meta }}>{project.role} &nbsp;·&nbsp; {project.tags.join(' · ')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PageContact = () => {
    const contacts = [
      { label: 'lucas.mezzomo@universo.univates.br', href: 'mailto:lucas.mezzomo@universo.univates.br', Icon: Mail },
      { label: '@lmezzomo_', href: 'https://www.instagram.com/lmezzomo_/', Icon: Instagram },
      { label: 'WhatsApp', href: 'https://wa.me/SEUNUMERO', Icon: MessageCircle },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', overflow: 'hidden', padding: '1.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={isDark ? logoDark : logoLight}
            alt="Lucas Mezzomo"
            style={{ width: isMobile ? '160px' : '220px', marginBottom: '2.5rem', opacity: 0.9 }}
          />
          <p style={{ ...meta, marginBottom: '2.5rem' }}>{t('nav.contact')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'center' }}>
            {contacts.map(({ label, href, Icon }) => (
              <a key={href} href={href} target={href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', fontSize: isMobile ? '0.85rem' : 'clamp(0.9rem, 2vw, 1.4rem)', fontWeight: 200, letterSpacing: '-0.01em', color: c.text, textDecoration: 'none', opacity: 0.45, transition: `opacity 0.3s ${ease}, color 0.3s ${ease}` }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = c.accent; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.45'; e.currentTarget.style.color = c.text; }}>
                <Icon size={15} strokeWidth={1.5} />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  // Chamadas diretas (não JSX components) para evitar remount quando o estado do pai muda
  const pages: Record<string, React.ReactNode> = {
    home:       PageHome(),
    experience: PageExperience(),
    skills:     PageSkills(),
    projects:   PageProjects(),
    contact:    PageContact(),
  };

  // ── Shared nav items renderer ─────────────────────────────────────────────────
  const NavItems = () => (
    <>
      {navItems.map((item, idx) => {
        const isActive = activePage === item.id;
        return (
          <div key={item.id} className="nav-item" style={{ animationDelay: `${idx * 0.1}s`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '0.1rem' }}>
            <span style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: isActive ? c.accent : 'transparent', marginBottom: isActive ? '4px' : '0', transition: `background 0.3s ${ease}, margin 0.3s ${ease}` }} />
            <button onClick={() => go(item.id)}
              style={{ fontSize: '0.875rem', fontWeight: 300, color: c.text, opacity: isActive ? 1 : 0.38, ...btnBase, padding: '0.28rem 0', textAlign: 'left', transition: `opacity 0.3s ${ease}` }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = isActive ? '1' : '0.38')}>
              {item.label}
            </button>
          </div>
        );
      })}
    </>
  );

  const NavBottom = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : language === 'en' ? 'es' : 'pt')}
          style={{ ...meta, ...btnBase, textAlign: 'left', opacity: 0.4 }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.4')}>
          {language === 'pt' ? 'PT → EN' : language === 'en' ? 'EN → ES' : 'ES → PT'}
        </button>
        <button onClick={toggleTheme}
          style={{ ...meta, ...btnBase, textAlign: 'left', opacity: 0.4 }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.4')}>
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: '0.85rem' }}>
        {[
          { href: 'https://github.com/mezzomolucas', Icon: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.8 1.3 3.48.99.1-.77.41-1.3.75-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg> },
          { href: 'https://www.linkedin.com/in/mezzomolucas/', Icon: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg> },
          { href: 'https://www.instagram.com/lmezzomo_/', Icon: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg> },
        ].map(({ href, Icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
            style={{ color: c.text, opacity: 0.25, display: 'flex', alignItems: 'center', transition: `opacity 0.3s ${ease}` }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.25')}>
            <Icon width={13} height={13} />
          </a>
        ))}
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────
  const fi = isMobile ? '8px' : '18px'; // frame inset

  return (
    <div style={{ position: 'fixed', inset: 0, background: c.bg, ...cssVars }}>

      <RingBackground isDark={isDark} />
      <GrainOverlay />

      {/* Border frame */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: fi, border: `1px solid ${c.border}`, pointerEvents: 'none', zIndex: 9999 }} />

      {/* Toast — email copiado */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed', bottom: isMobile ? '1.25rem' : '2rem',
              right: isMobile ? '1.25rem' : '2rem',
              zIndex: 500,
              background: c.bg, border: `1px solid ${c.accent}`,
              padding: '0.6rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: `0 0 18px rgba(0,201,109,0.12)`,
            }}
          >
            <Check size={11} style={{ color: c.accent, flexShrink: 0 }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: c.text }}>
              {t('contact.copied')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} isDark={isDark} />}
      </AnimatePresence>

      {/* ── DESKTOP layout ── */}
      {!isMobile && (
        <>
          {/* DARK / LIGHT vertical labels */}
          <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0', pointerEvents: 'none' }}>
            {(['DARK', 'LIGHT'] as const).map(lbl => (
              <button key={lbl} onClick={toggleTheme} style={{
                writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                fontSize: '0.58rem', letterSpacing: '0.18em', color: c.text,
                opacity: (lbl === 'DARK') === isDark ? 0.7 : 0.22,
                background: 'none', border: 'none', cursor: 'pointer', padding: '0 13px', pointerEvents: 'auto',
                transition: `opacity 0.3s ${ease}`,
              }}>{lbl}</button>
            ))}
          </div>

          {/* Desktop content: nav + page */}
          <div style={{ position: 'fixed', inset: fi, display: 'flex', zIndex: 10, overflow: 'hidden' }}>
            {/* Left nav */}
            <nav style={{ width: '190px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '2.25rem 1.75rem 2.25rem 2.25rem', borderRight: `1px solid ${c.border}` }}>
              <button onClick={() => navigate('/')}
                style={{ ...meta, ...btnBase, textAlign: 'left', marginBottom: '2.25rem', opacity: 0.5 }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.5')}>
                ← back
              </button>
              <div style={{ marginBottom: '2.75rem' }}>
                <svg viewBox="0 0 100 100" style={{ width: '26px', height: '26px', display: 'block', marginBottom: '0.6rem' }}>
                  <g fill="none" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 12 V88 H46" stroke={c.text} />
                    <path d="M38 88 V26 L56 53 L74 26 V88" stroke={c.text} />
                  </g>
                </svg>
                <p style={{ fontSize: '0.875rem', fontWeight: 300, color: c.text, letterSpacing: '-0.01em' }}>Lucas Mezzomo</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3em', marginTop: '0.25rem' }}>
                  <span style={{ ...meta }}>Dev.</span>
                  <span style={{ ...meta, color: c.accent }}>
                    <TextType text={roles} typingSpeed={60} deletingSpeed={35} pauseDuration={2200} initialDelay={800} showCursor cursorCharacter="_" textColors={[c.accent]} />
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
                <NavItems />
              </div>
              <NavBottom />
            </nav>

            {/* Page content */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div key={activePage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }} style={{ position: 'absolute', inset: 0 }}>
                  {pages[activePage]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      )}

      {/* ── MOBILE layout ── */}
      {isMobile && (
        <>
          {/* Mobile top bar */}
          <div style={{ position: 'fixed', top: fi, left: fi, right: fi, height: '44px', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.border}`, padding: '0 1.1rem' }}>
            <button onClick={() => navigate('/')} style={{ ...meta, ...btnBase, opacity: 0.55 }}>← back</button>
            <span style={{ fontSize: '0.75rem', fontWeight: 300, color: c.text, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg viewBox="0 0 100 100" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                <g fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 12 V88 H46" stroke={c.text} />
                  <path d="M38 88 V26 L56 53 L74 26 V88" stroke={c.text} />
                </g>
              </svg>
              Lucas Mezzomo
            </span>
            <button onClick={() => setMenuOpen(m => !m)} style={{ color: c.text, ...btnBase, opacity: 0.7, display: 'flex', alignItems: 'center' }}>
              {menuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile nav overlay */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 30 }} />
                {/* Drawer */}
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
                  style={{ position: 'fixed', top: `calc(${fi} + 44px)`, left: fi, bottom: fi, width: '220px', zIndex: 40, background: c.bg, borderRight: `1px solid ${c.border}`, padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <NavItems />
                  </div>
                  <NavBottom />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Mobile content area */}
          <div style={{ position: 'fixed', top: `calc(${fi} + 44px)`, left: fi, right: fi, bottom: fi, zIndex: 10, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div key={activePage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }} style={{ position: 'absolute', inset: 0 }}>
                {pages[activePage]}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-8 border-t border-white/5 flex flex-col items-center gap-4">
      <p className="text-white/15 text-xs font-mono">© {new Date().getFullYear()} Lucas Mezzomo. {t('footer.rights')}</p>
    </footer>
  );
};

export { Hero, PortfolioPage, Footer };
