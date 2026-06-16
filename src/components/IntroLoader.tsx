import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const increment = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress(p => {
        const n = p + increment;
        if (n >= 100) { clearInterval(timer); return 100; }
        return n;
      });
    }, interval);
    const done = setTimeout(() => onComplete(), duration + 500);
    return () => { clearInterval(timer); clearTimeout(done); };
  }, [onComplete]);

  const r = 130;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (circumference * progress) / 100;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100, background: '#000000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    }}>

      {/* Grain — identical to portfolio */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.14, animation: 'grain-breathe 8s ease-in-out infinite' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="l-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#l-noise)" />
        </svg>
      </div>

      {/* Border frame — matches portfolio */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '18px', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Static background rings */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none' }}>
        {[88, 62, 18].map(s => (
          <div key={s} style={{ position: 'absolute', width: `${s}vmin`, height: `${s}vmin`, borderRadius: '50%', border: '1px solid rgba(0,200,100,0.05)' }} />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ position: 'relative', zIndex: 3 }}
        animate={progress === 100 ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Progress ring SVG */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
            viewBox="0 0 280 280"
          >
            {/* Track */}
            <circle cx="140" cy="140" r={r} stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="transparent" />
            {/* Progress — green glow */}
            <circle
              cx="140" cy="140" r={r}
              stroke="#00c96d"
              strokeWidth="1"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.05s linear', filter: 'drop-shadow(0 0 4px rgba(0,201,109,0.6))' }}
            />
          </svg>

          {/* Inner decorative rings */}
          <div style={{ position: 'absolute', width: '190px', height: '190px', borderRadius: '50%', border: '1px solid rgba(0,200,100,0.06)' }} />
          <div style={{ position: 'absolute', width: '110px', height: '110px', borderRadius: '50%', border: '1px solid rgba(0,200,100,0.04)' }} />

          {/* Percentage text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '3.75rem', fontWeight: 100, letterSpacing: '-0.04em', color: '#f0f0f0', lineHeight: 1 }}>
              {Math.round(progress)}
              <span style={{ fontSize: '1.25rem', fontWeight: 200, opacity: 0.25 }}>%</span>
            </span>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00c96d', opacity: 0.65 }}>
              Loading
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroLoader;
