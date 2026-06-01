import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500); // Slight buffer before unmounting

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] overflow-hidden">
       {/* Blue Background (Base) - Darker Blue */}
       <div className="absolute inset-0 bg-[#000814] z-0" />

       {/* Black Curtain Overlay - Descends based on progress */}
       <motion.div
         className="absolute top-0 left-0 w-full bg-[#0a0a0a] z-10 border-b border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
         initial={{ height: "0%" }}
         animate={{ height: `${progress}%` }}
         transition={{ ease: "linear", duration: 0.05 }} // Smooth updates
       />

       {/* Loader Content - Visible on top of everything until 100% */}
       <motion.div 
         className="relative z-20 flex flex-col items-center justify-center"
         animate={progress === 100 ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
       >
          {/* Large Circular Loader */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="160"
                cy="160"
                r="150"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="2"
                fill="transparent"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="160"
                cy="160"
                r="150"
                stroke="#3b82f6" // Blue-500
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={942} // 2 * PI * 150
                strokeDashoffset={942 - (942 * progress) / 100}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Percentage Text */}
            <div className="flex flex-col items-center">
              <span className="text-6xl font-mono font-bold text-white tracking-tighter">
                {Math.round(progress)}%
              </span>
              <span className="text-xs text-blue-500 font-mono mt-2 uppercase tracking-[0.2em]">Loading</span>
            </div>
          </div>
       </motion.div>
    </div>
  );
};

export default IntroLoader;
