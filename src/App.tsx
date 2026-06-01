import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import { Hero, PortfolioPage } from './components/Sections';
import IntroLoader from './components/IntroLoader';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  // Only show intro on root path and first load
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowIntro(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
      {showIntro && location.pathname === '/' && (
        <IntroLoader onComplete={() => setShowIntro(false)} />
      )}
      
      <ParticleBackground />
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
  );
}
