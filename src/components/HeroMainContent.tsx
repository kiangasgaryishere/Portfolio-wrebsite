import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import floatingHeadImg from '../assets/images/floating_head.png';
import portraitNewJpg from '../assets/images/new_developer_portrait_1784826730051.jpg';
import portraitPng from '../assets/images/chatgpt_developer_portrait.png';
import portraitJpg from '../assets/images/chatgpt_developer_portrait.jpg';
import portraitWebp from '../assets/images/chatgpt_developer_portrait.webp';

export interface HeroMainContentProps {
  onImageClick?: () => void;
  onCopyText?: (text: string, label: string) => void;
  copiedField?: string | null;
  onSelectSection?: (sectionName: string) => void;
}

const FALLBACK_SOURCES: readonly string[] = [
  floatingHeadImg,
  '/floating_head.png',
  portraitNewJpg,
  portraitPng,
  portraitJpg,
  portraitWebp,
  '/chatgpt_developer_portrait.png',
  '/chatgpt_developer_portrait.jpg',
  '/chatgpt_developer_portrait.webp',
];

export const HeroMainContent: React.FC<HeroMainContentProps> = ({
  onImageClick,
  onSelectSection,
}) => {
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState<number>(0);

  const handleImageError = (): void => {
    setImgIndex((prev) => (prev + 1 < FALLBACK_SOURCES.length ? prev + 1 : prev));
  };

  return (
    <section 
      aria-label="Developer Introduction" 
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-2 sm:pt-4 pb-4 sm:pb-6 flex-1 flex flex-col justify-start"
    >
      {/* 3-Column Hero Grid balancing Left Metrics, Center Portrait & Right Bio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center md:items-start w-full my-auto pb-2 sm:pb-4 md:pb-6">
        
        {/* Left Column: Quick Metrics & Interactive Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex flex-col justify-start items-center md:items-start text-xs sm:text-sm order-2 md:order-1 pt-2 md:pt-8"
        >
          {/* Quick Metrics Grid */}
          <div className="w-full max-w-sm md:max-w-none">
            <div className="grid grid-cols-2 gap-3.5 w-full">
              <button
                type="button"
                onClick={() => onSelectSection?.('Biography & Philosophy')}
                className="p-3 sm:p-4 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800 hover:border-[var(--accent-color)]/60 text-left rtl:text-right shadow-sm transition-all duration-200 cursor-pointer group active:scale-95 touch-manipulation min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
                aria-label={`View Biography: ${t('years_exp_num')} ${t('years_exp_label')}`}
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-[var(--accent-color)] transition-colors hero-metric-num">
                  <span>{t('years_exp_num')}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 font-sans leading-tight hero-metric-label">
                  {t('years_exp_label')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectSection?.('Workflow')}
                className="p-3 sm:p-4 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800 hover:border-[var(--accent-color)]/60 text-left rtl:text-right shadow-sm transition-all duration-200 cursor-pointer group active:scale-95 touch-manipulation min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
                aria-label={`View Workflow: ${t('workflow_num')} ${t('workflow_label')}`}
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-[var(--accent-color)] transition-colors hero-metric-num">
                  <span>{t('workflow_num')}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 font-sans leading-tight hero-metric-label">
                  {t('workflow_label')}
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Center Column: Cut-out Headshot Image with Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex justify-center items-center relative z-10 cursor-pointer group order-1 md:order-2 my-2 md:my-0 touch-manipulation focus-visible:outline-none"
          onClick={onImageClick}
          role="button"
          tabIndex={0}
          aria-label="Developer portrait, tap to view full profile and biography"
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onImageClick?.();
            }
          }}
        >
          {/* Specular Ambient Backlight Glow around portrait */}
          <div 
            className="absolute inset-0 -m-6 sm:-m-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(var(--accent-rgb),0.25)_0%,rgba(var(--accent-rgb),0.08)_50%,transparent_80%)] blur-2xl rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out"
            aria-hidden="true"
          />

          <img
            src={FALLBACK_SOURCES[imgIndex]}
            alt="Kian Gasgary Portrait"
            onError={handleImageError}
            loading="eager"
            decoding="async"
            style={{
              filter: 'drop-shadow(0 0 24px rgba(var(--accent-rgb), 0.28))',
            }}
            className="w-52 sm:w-72 md:w-[300px] lg:w-[360px] h-auto max-h-[42vh] md:max-h-none object-contain transition-transform duration-300 ease-out transform-gpu group-hover:scale-105 active:scale-95 select-none relative z-10"
          />
        </motion.div>

        {/* Right Column: Bio paragraph */}
        <motion.div 
          initial={{ opacity: 0, x: 20, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex flex-col justify-start items-center md:items-start text-xs sm:text-sm order-3 pt-2 md:pt-8 text-center md:text-left rtl:md:text-right"
        >
          <div className="w-full max-w-sm md:max-w-none">
            <p className="text-zinc-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed tracking-normal">
              {t('hero_bio')}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


