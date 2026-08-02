import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Menu } from 'lucide-react';
import { ThemeColor, THEME_COLORS } from '../theme';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  onOpenMenu: () => void;
  currentTheme: ThemeColor;
  onSelectTheme: (theme: ThemeColor) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenMenu, 
  currentTheme,
  onSelectTheme,
}) => {
  const { t, roles } = useLanguage();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  // Update typewriter roles when language changes
  useEffect(() => {
    setCurrentRoleIndex(0);
    setCurrentText(roles[0]);
    setIsDeleting(false);
  }, [roles]);

  useEffect(() => {
    const fullText = roles[currentRoleIndex] || roles[0];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 35 : 75;
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? fullText.slice(0, currentText.length - 1)
          : fullText.slice(0, currentText.length + 1);
        setCurrentText(nextText);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <header className="relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 select-none max-w-7xl mx-auto">
      {/* FAR LEFT CONTROLS: Theme Selector & Language Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 order-1"
      >
        {/* Accent Color Theme Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
            className="p-2.5 sm:px-3 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
            title="Choose Accent Theme Color"
            aria-label="Select theme accent color"
            aria-expanded={isThemePickerOpen}
            id="theme-picker-btn"
          >
            <Palette className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-sm transition-colors"
              style={{ backgroundColor: currentTheme.hex }} 
            />
            <span className="hidden sm:inline text-[11px] font-mono uppercase text-zinc-300">{currentTheme.name}</span>
          </button>

          {/* Theme Dropdown Menu */}
          <AnimatePresence>
            {isThemePickerOpen && (
              <>
                {/* Backdrop overlay to close on outside click */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsThemePickerOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-48 sm:w-56 p-2 rounded-2xl bg-[#121214]/95 border border-white/15 backdrop-blur-xl shadow-2xl z-50 flex flex-col gap-1"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{t('accent_mode')}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.hex }} />
                  </div>
                  {THEME_COLORS.map((themeItem) => {
                    const isActive = themeItem.id === currentTheme.id;
                    return (
                      <button
                        type="button"
                        key={themeItem.id}
                        onClick={() => {
                          onSelectTheme(themeItem);
                          setIsThemePickerOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer text-xs font-mono min-h-[40px] ${
                          isActive 
                            ? 'bg-white/10 text-white font-medium' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20 shadow-sm" 
                            style={{ backgroundColor: themeItem.hex }}
                          />
                          <span>{themeItem.name}</span>
                        </div>
                        {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CENTER BADGE: Polished developer introduction tag with Typewriter effect */}
      <motion.div
        initial={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-auto flex justify-center items-center order-3 md:order-2"
      >
        <a 
          href="#top" 
          className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[var(--accent-color)]/50 transition-all duration-300 text-xs sm:text-sm text-zinc-200 hover:text-white shadow-sm touch-manipulation min-h-[44px]"
          id="brand-name-link"
        >
          <span className="animate-wave text-base select-none leading-none">👋</span>
          <span className="font-sans font-medium tracking-wide">
            {t('hey_im')}{' '}
            <span className="text-white font-semibold group-hover:text-[var(--accent-color)] transition-colors inline-flex items-center">
              {currentText}
              <span className="inline-block w-[2px] h-[1em] bg-[var(--accent-color)] mx-0.5 align-middle animate-pulse" />
            </span>
          </span>
        </a>
      </motion.div>

      {/* FAR RIGHT CONTROL: Minimalist White Pill Button labeled "Menu" */}
      <motion.div
        initial={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-end order-2 md:order-3"
      >
        <button
          type="button"
          onClick={onOpenMenu}
          className="px-4 sm:px-5 py-2.5 rounded-full bg-white text-[#0b0b0c] font-medium text-xs sm:text-sm tracking-wide hover:bg-[var(--accent-color)] transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5 flex items-center gap-2 cursor-pointer group touch-manipulation min-h-[44px]"
          id="menu-btn"
          aria-label="Open navigation menu"
        >
          <span>{t('menu')}</span>
          <Menu className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
      </motion.div>
    </header>
  );
};

