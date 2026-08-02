/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { AmbientAura } from './components/AmbientAura';
import { Navbar } from './components/Navbar';
import { HeroHeading } from './components/HeroHeading';
import { HeroMainContent } from './components/HeroMainContent';
import { HeroFooter } from './components/HeroFooter';
import { MenuDrawer } from './components/MenuDrawer';
import { Toast } from './components/Toast';
import { ProjectShowcaseModal } from './components/ProjectShowcaseModal';
import { ToastMessage } from './types';
import { ThemeColor, THEME_COLORS, DEFAULT_THEME, applyTheme } from './theme';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSectionModal, setActiveSectionModal] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Theme state with local storage persistence
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(() => {
    try {
      const savedThemeId = localStorage.getItem('app_accent_theme');
      if (savedThemeId) {
        const found = THEME_COLORS.find(t => t.id === savedThemeId);
        if (found) return found;
      }
    } catch {
      // LocalStorage error fallback
    }
    return DEFAULT_THEME;
  });

  // Apply theme variables to root document
  useEffect(() => {
    applyTheme(currentTheme);
    try {
      localStorage.setItem('app_accent_theme', currentTheme.id);
    } catch {
      // Storage fallback
    }
  }, [currentTheme]);

  // Play subtle synth audio feedback on interaction
  const playInteractionSound = useCallback((frequency = 440, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio context policy fallback
    }
  }, [soundEnabled]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
  };

  const handleSelectTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    playInteractionSound(720, 'triangle');
    showToast(`Accent theme updated to ${theme.name}`, 'info');
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`${label} copied to clipboard: ${text}`, 'success');
    playInteractionSound(600, 'sine');

    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    playInteractionSound(520, 'triangle');
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    playInteractionSound(380, 'sine');
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen w-full bg-[#0b0b0c] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[var(--accent-color)] selection:text-[#0b0b0c] font-sans antialiased">
        
        {/* Remade Multi-Layered Ambient Aura */}
        <AmbientAura />

        {/* Subtle Noise Texture Overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" 
          aria-hidden="true"
        />

        {/* Navigation Bar */}
        <Navbar
          onOpenMenu={handleOpenMenu}
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
        />

        {/* Main Hero Container */}
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative z-10 flex-1 flex flex-col justify-between w-full"
        >
          {/* Center Main Content Header Block */}
          <HeroHeading />

          {/* 3-Column Hero Content: Left Info | Centered Headshot | Right Bio & Socials */}
          <HeroMainContent 
            onImageClick={() => {
              setActiveSectionModal('Biography & Philosophy');
              playInteractionSound(540, 'sine');
            }}
            onCopyText={handleCopyText}
            copiedField={copiedField}
            onSelectSection={(sectionName) => {
              setActiveSectionModal(sectionName);
              playInteractionSound(540, 'sine');
            }}
          />

          {/* Hero Footer */}
          <HeroFooter />
        </motion.main>

        {/* Interactive Editorial Menu Overlay */}
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          isModalActive={!!activeSectionModal}
          onSelectSection={(sectionName) => {
            setActiveSectionModal(sectionName);
            playInteractionSound(640, 'triangle');
          }}
        />

        {/* Modal for Menu / Interactive Section Highlights */}
        <ProjectShowcaseModal
          sectionName={activeSectionModal}
          onClose={() => {
            setActiveSectionModal(null);
            playInteractionSound(320, 'sine');
          }}
        />

        {/* Toast Notification */}
        <Toast toast={toast} />

      </div>
    </LanguageProvider>
  );
}
