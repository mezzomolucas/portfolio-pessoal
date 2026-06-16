import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Hero, PortfolioPage } from './components/Sections';
import IntroLoader from './components/IntroLoader';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') setShowIntro(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <ThemeProvider>
      <div className="font-sans overflow-hidden">
        {showIntro && isHome && (
          <IntroLoader onComplete={() => setShowIntro(false)} />
        )}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
