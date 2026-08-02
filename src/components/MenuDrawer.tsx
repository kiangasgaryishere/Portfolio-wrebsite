import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ArrowUpRight, Sparkles, 
  Eye, Cpu, ExternalLink,
  FolderKanban, User, Mail, Workflow
} from 'lucide-react';

import proj3dDriving from '../assets/images/project_3d_driving_1784808927002.jpg';
import projThreejsCourse from '../assets/images/project_threejs_course_1784808938523.jpg';
import projRealtimeCanvas from '../assets/images/project_realtime_canvas_1784808950837.jpg';
import { useLanguage } from '../LanguageContext';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionName: string) => void;
  isModalActive?: boolean;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose, onSelectSection, isModalActive }) => {
  const { t, projects } = useLanguage();
  const [hoveredProjectId, setHoveredProjectId] = useState<string>('proj-1');

  const imageMap: Record<string, string> = {
    'proj-1': proj3dDriving,
    'proj-2': projThreejsCourse,
    'proj-3': projRealtimeCanvas,
  };

  const projectsList = projects.map((p) => ({
    ...p,
    image: imageMap[p.id] || proj3dDriving,
  }));

  const sectionNavigation = [
    { number: '01', title: t('sec_01_title'), subtitle: t('sec_01_sub'), tag: 'Journey', section: 'Workflow', Icon: Workflow },
    { number: '02', title: t('sec_02_title'), subtitle: t('sec_02_sub'), tag: 'Full Stack', section: 'Architecture & Stack', Icon: Cpu },
    { number: '03', title: t('sec_03_title'), subtitle: t('sec_03_sub'), tag: 'About', section: 'Biography & Philosophy', Icon: User },
    { number: '04', title: t('sec_04_title'), subtitle: t('sec_04_sub'), tag: 'Available', section: 'Contact & Collaboration', Icon: Mail },
  ];

  // Close menu on Escape key (only if no section modal is active over it)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isModalActive) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isModalActive, onClose]);

  const activeProject = projectsList.find((p) => p.id === hoveredProjectId) || projectsList[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#070708]/90 backdrop-blur-2xl"
          />

          {/* Full Screen Overlay Container */}
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 md:p-12 bg-[#0d0d10] text-white border-b border-zinc-800/80 overflow-y-auto no-scrollbar"
          >
            {/* Top Navigation Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
              <div className="flex items-center gap-3">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white">{t('hero_name')}</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full bg-zinc-800 hover:bg-white text-zinc-300 hover:text-[#0b0b0c] font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 touch-manipulation min-h-[44px] min-w-[44px]"
                id="close-menu-btn"
                aria-label={t('close')}
              >
                <span>{t('close')}</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MAIN MENU LAYOUT */}
            <div className="my-4 sm:my-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start max-w-7xl mx-auto w-full flex-1">
              {/* Left Column: 4 Main Section Cards + Project Overview Hover Links */}
              <div className="lg:col-span-6 space-y-6">
                {/* 4 Main Section Cards */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('main_sections')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sectionNavigation.map((sec) => (
                      <div
                        key={sec.number}
                        onClick={() => {
                          onSelectSection(sec.section);
                        }}
                        className="group p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/95 border border-zinc-800 hover:border-[var(--accent-color)]/70 transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow-md touch-manipulation min-h-[52px]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-[rgba(var(--accent-rgb),0.12)] border border-[rgba(var(--accent-rgb),0.25)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                            <sec.Icon className="w-4.5 h-4.5 text-[var(--accent-color)]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-[var(--accent-color)] font-bold px-1.5 py-0.2 rounded bg-zinc-800/80">{sec.number}</span>
                              <h3 className="font-display font-bold text-sm text-white group-hover:text-[var(--accent-color)] transition-colors truncate">
                                {sec.title}
                              </h3>
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{sec.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800/90 text-[var(--accent-color)] border border-zinc-700/60 hidden sm:inline">
                            {sec.tag}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all rtl:rotate-90" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Overview Hover Links */}
                <div className="pt-4 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      {t('project_showcase')}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {projectsList.map((proj) => {
                      const isHovered = hoveredProjectId === proj.id;
                      return (
                        <div
                          key={proj.id}
                          onMouseEnter={() => setHoveredProjectId(proj.id)}
                          onClick={() => {
                            onSelectSection('Featured Projects');
                          }}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                            isHovered
                              ? 'bg-zinc-800/90 border-[var(--accent-color)] shadow-lg shadow-[rgba(var(--accent-rgb),0.1)]'
                              : 'bg-zinc-900/40 border-zinc-800/70 hover:bg-zinc-800/50 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-700/80 shrink-0 relative bg-zinc-950">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {isHovered && (
                                <div className="absolute inset-0 bg-[rgba(var(--accent-rgb),0.2)] backdrop-blur-[1px]" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-sm text-white flex items-center gap-2 truncate">
                                <span className="truncate">{proj.title}</span>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[var(--accent-color)] shrink-0">
                                  {proj.category}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 truncate mt-0.5">{proj.subtitle}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 ml-2">
                            <span className="text-xs font-mono text-zinc-500 group-hover:text-white hidden sm:inline">
                              {proj.year}
                            </span>
                            <ArrowUpRight className={`w-4 h-4 transition-all rtl:rotate-90 ${
                              isHovered ? 'text-[var(--accent-color)] translate-x-0.5 -translate-y-0.5' : 'text-zinc-600'
                            }`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic High-Res Visual Image Preview Panel */}
              <div className="lg:col-span-6 h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col group"
                  >
                    {/* Image Thumbnail Header with Gradient Overlay */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-black/30" />
                    </div>

                    {/* Content Card Details */}
                    <div className="p-6 space-y-4 bg-zinc-900/90">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-display font-bold text-xl text-white flex items-center gap-2">
                            <span>{activeProject.title}</span>
                          </h4>
                          <p className="text-xs text-[var(--accent-color)] font-mono mt-0.5">{activeProject.subtitle}</p>
                        </div>
                        <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                          {activeProject.year}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {activeProject.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeProject.tech.map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                        <button
                          onClick={() => {
                            onSelectSection('Featured Projects');
                          }}
                          className="px-4 py-2 rounded-xl bg-white text-[#0b0b0c] hover:bg-[var(--accent-color)] font-mono font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <span>{t('open_project_showcase')}</span>
                          <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                        </button>

                        {activeProject.link && (
                          <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono text-zinc-400 hover:text-[var(--accent-color)] transition-colors flex items-center gap-1"
                          >
                            <span>{t('visit_live_url')}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

