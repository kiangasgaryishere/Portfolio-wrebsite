import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export const HeroHeading: React.FC = () => {
  const { t } = useLanguage();
  const [isNarrowScreen, setIsNarrowScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 375;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 374.98px)');
    
    const updateNarrowStatus = () => {
      setIsNarrowScreen(mediaQuery.matches);
    };

    updateNarrowStatus();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateNarrowStatus);
      return () => mediaQuery.removeEventListener('change', updateNarrowStatus);
    } else {
      mediaQuery.addListener(updateNarrowStatus);
      return () => mediaQuery.removeListener(updateNarrowStatus);
    }
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-3 sm:px-8 md:px-12 lg:px-16 text-center select-none pt-2 sm:pt-6 md:pt-8 pb-1 sm:pb-2 pointer-events-none">
      {/* Main Heading: Oversized, bold, all-caps display typography with smooth text glow */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-full pointer-events-auto flex justify-center items-center py-1 sm:py-2 my-1 overflow-hidden"
      >
        <h1 
          className={`font-display font-black uppercase text-white text-center relative z-10 hero-heading-text transition-all duration-300 ${
            isNarrowScreen 
              ? 'tracking-tighter whitespace-normal break-words leading-tight px-1' 
              : 'tracking-tight sm:tracking-wide whitespace-normal sm:whitespace-nowrap break-words leading-[1.08]'
          }`}
          style={{ 
            fontSize: isNarrowScreen 
              ? 'clamp(1.15rem, 6.8vw, 1.6rem)' 
              : 'clamp(1.35rem, 7.5vw, 5.5rem)', 
            filter: 'drop-shadow(0 0 16px rgba(var(--accent-rgb), 0.18))'
          }}
          id="main-hero-name"
        >
          {t('hero_name')}
        </h1>
      </motion.div>
    </div>
  );
};

