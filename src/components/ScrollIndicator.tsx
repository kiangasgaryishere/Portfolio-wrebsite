import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface ScrollIndicatorProps {
  onScrollClick?: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onScrollClick }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 25, filter: 'blur(6px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.3, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex fixed right-6 sm:right-10 rtl:right-auto rtl:left-6 rtl:sm:left-10 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 select-none cursor-pointer group"
      onClick={onScrollClick}
      title="Scroll down to explore"
      id="scroll-indicator"
    >
      {/* Top thin vertical line animated */}
      <div className="w-[1px] h-12 bg-zinc-800 relative overflow-hidden">
        <div className="w-full h-full bg-[var(--accent-color)] animate-bounce opacity-80" />
      </div>

      {/* Vertical SCROLL indicator text */}
      <span className="vertical-text font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-400 group-hover:text-[var(--accent-color)] transition-colors">
        {t('scroll')}
      </span>

      {/* Bottom thin vertical line */}
      <div className="w-[1px] h-12 bg-zinc-800 group-hover:bg-[rgba(var(--accent-rgb),0.4)] transition-colors" />
    </motion.div>
  );
};
