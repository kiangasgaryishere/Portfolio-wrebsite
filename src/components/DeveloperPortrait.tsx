import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import portraitNewJpg from '../assets/images/new_developer_portrait_1784826730051.jpg';
import floatingHeadImg from '../assets/images/floating_head.png';
import portraitPng from '../assets/images/chatgpt_developer_portrait.png';
import portraitJpg from '../assets/images/chatgpt_developer_portrait.jpg';
import portraitWebp from '../assets/images/chatgpt_developer_portrait.webp';

const PLACEHOLDER_DATA_URI =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAYABADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMEBf/EACIQAAEEAgIBBQAAAAAAAAAAAAEAAgMRBBIhURQiMUKRof/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAESH/2gAMAwEAAhEDEQA/AOXPA57gBVXzwp5OGIHmM04gXYFfirHl6UydvsbLgOVWTM8xxbpR+PZ6s/aO0sjPNksmJdLHbib9IASLKihO0cbtuyiJC//Z';

const PORTRAIT_FALLBACKS = [
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

interface DeveloperPortraitProps {
  onImageClick?: () => void;
}

export const DeveloperPortrait: React.FC<DeveloperPortraitProps> = ({ onImageClick }) => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto mt-2 sm:mt-4 md:mt-6 px-4">
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* Main Cut-out Headshot Image with Low-Res Base64 Placeholder & Specular Glow */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto relative flex justify-center group shrink-0"
          onClick={onImageClick}
        >
          {/* Subtle Backlight Specular Rim Glow */}
          <div 
            className="absolute inset-0 bg-radial from-[rgba(var(--accent-rgb),0.25)] via-[rgba(var(--accent-rgb),0.08)] to-transparent blur-2xl rounded-full scale-110 pointer-events-none group-hover:scale-125 transition-transform duration-700 ease-out"
            aria-hidden="true"
          />

          {/* Low-res base64 blur placeholder background */}
          <img
            src={PLACEHOLDER_DATA_URI}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-contain filter blur-md transition-opacity duration-500 pointer-events-none ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* High-res image with luxury drop shadow */}
          <img
            src={PORTRAIT_FALLBACKS[imgIndex]}
            alt="Kian Gasgary Headshot"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setImgIndex((prev) => (prev + 1 < PORTRAIT_FALLBACKS.length ? prev + 1 : prev));
            }}
            className={`w-56 sm:w-72 md:w-[320px] lg:w-[360px] h-auto object-contain cursor-pointer relative z-10 filter drop-shadow-[0_20px_40px_rgba(var(--accent-rgb),0.20)] transition-all duration-700 ease-out transform group-hover:scale-105 group-hover:drop-shadow-[0_25px_50px_rgba(var(--accent-rgb),0.35)] ${
              isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
          />
        </motion.div>

        {/* Bio paragraph next to the hero image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:max-w-xs lg:max-w-sm text-center md:text-left rtl:md:text-right p-5 space-y-2 pointer-events-auto"
        >
          <div className="text-[11px] font-mono text-[#34d399] uppercase tracking-widest font-semibold">{t('about_me')}</div>
          <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
            {t('portrait_bio')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

