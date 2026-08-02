import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ExternalLink, Code2, Cpu, Terminal, Sparkles, CheckCircle2, 
  FolderKanban, User, Mail, Send,
  Users, Brain, ShieldCheck, Zap, HeartHandshake,
  MessageSquare, Lightbulb, Target, ShieldAlert, Activity,
  Github, Linkedin, Twitter,
  Layers, Box, Database, Server, Workflow, Gauge, Globe, Layers3, Monitor, Container, Shield, Flame, HardDrive, Wrench, Layout
} from 'lucide-react';

import proj3dDriving from '../assets/images/project_3d_driving_1784808927002.jpg';
import projThreejsCourse from '../assets/images/project_threejs_course_1784808938523.jpg';
import projRealtimeCanvas from '../assets/images/project_realtime_canvas_1784808950837.jpg';
import floatingHeadImg from '../assets/images/floating_head.png';
import portraitNewJpg from '../assets/images/new_developer_portrait_1784826730051.jpg';
import portraitPng from '../assets/images/chatgpt_developer_portrait.png';
import portraitJpg from '../assets/images/chatgpt_developer_portrait.jpg';
import portraitWebp from '../assets/images/chatgpt_developer_portrait.webp';
import { useLanguage } from '../LanguageContext';

const BIO_PORTRAIT_FALLBACKS = [
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

interface ProjectShowcaseModalProps {
  sectionName: string | null;
  onClose: () => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({ sectionName, onClose }) => {
  const { t, projects, fifaAttributes, isRtl } = useLanguage();
  const [activeFifaAttrId, setActiveFifaAttrId] = useState<string>('prb');
  const [radarSkillPopover, setRadarSkillPopover] = useState<typeof fifaAttributes[0] | null>(null);
  const [bioImgIndex, setBioImgIndex] = useState<number>(0);
  const [selectedStackCategory, setSelectedStackCategory] = useState<string>('all');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sectionName) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sectionName, onClose]);

  if (!sectionName) return null;

  const imageMap: Record<string, string> = {
    'proj-1': proj3dDriving,
    'proj-2': projThreejsCourse,
    'proj-3': projRealtimeCanvas,
  };

  const projectListWithImages = projects.map((p) => ({
    ...p,
    image: imageMap[p.id] || proj3dDriving,
  }));

  const iconMap: Record<string, React.ElementType> = {
    prb: Lightbulb,
    tea: HeartHandshake,
    uix: Sparkles,
    arc: Code2,
    own: Target,
    ada: Zap,
  };

  const selectedFifaAttr = fifaAttributes.find((a) => a.id === activeFifaAttrId) || fifaAttributes[0];
  const SelectedIcon = iconMap[selectedFifaAttr.id] || Lightbulb;

  // Radar Chart Calculations (320x320 Canvas)
  const radarCX = 160;
  const radarCY = 160;
  const radarR = 100;

  const getRadarPoint = (index: number, ratio: number) => {
    const angle = ((index * 60 - 90) * Math.PI) / 180;
    const x = radarCX + radarR * ratio * Math.cos(angle);
    const y = radarCY + radarR * ratio * Math.sin(angle);
    return { x, y, angle };
  };

  const getPolygonPoints = (ratio: number) => {
    return fifaAttributes
      .map((_, i) => {
        const { x, y } = getRadarPoint(i, ratio);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const playerPolygonPoints = fifaAttributes
    .map((attr, i) => {
      const { x, y } = getRadarPoint(i, attr.val / 100);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const renderSectionIcon = () => {
    switch (sectionName) {
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-[var(--accent-color)]" />;
      case 'Featured Projects':
        return <FolderKanban className="w-5 h-5 text-[var(--accent-color)]" />;
      case 'Architecture & Stack':
        return <Cpu className="w-5 h-5 text-[var(--accent-color)]" />;
      case 'Biography & Philosophy':
        return <User className="w-5 h-5 text-[var(--accent-color)]" />;
      case 'Contact & Collaboration':
        return <Mail className="w-5 h-5 text-[var(--accent-color)]" />;
      default:
        return <Terminal className="w-5 h-5 text-[var(--accent-color)]" />;
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-[#070708]/90 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#121216] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl text-white max-h-[88vh] overflow-y-auto no-scrollbar"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              {renderSectionIcon()}
              <h2 className="font-display font-bold text-lg sm:text-2xl text-white">
                {sectionName === 'Workflow' && t('sec_1_title')}
                {sectionName === 'Featured Projects' && t('sec_1_title')}
                {sectionName === 'Architecture & Stack' && t('sec_2_title')}
                {sectionName === 'Biography & Philosophy' && t('sec_3_title')}
                {sectionName === 'Contact & Collaboration' && t('sec_4_title')}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              id="close-showcase-btn"
              aria-label={t('close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Workflow / Journey Section */}
          {sectionName === 'Workflow' && (
            <div className="space-y-6">
              <div className="relative pl-6 sm:pl-8 border-l border-zinc-800/80 space-y-8 rtl:pl-0 rtl:border-l-0 rtl:pr-6 rtl:sm:pr-8 rtl:border-r">
                
                {/* Step 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative will-change-transform will-change-opacity"
                >
                  <div className="absolute -left-[35px] sm:-left-[43px] rtl:-left-auto rtl:left-auto rtl:-right-[35px] rtl:sm:-right-[43px] w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-[var(--accent-color)]">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <h3 className="font-display font-bold text-lg text-white mb-2">{t('workflow_step1_title')}</h3>
                    <p className="text-zinc-300 text-sm font-sans">{t('workflow_step1_desc')}</p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative will-change-transform will-change-opacity"
                >
                  <div className="absolute -left-[35px] sm:-left-[43px] rtl:-left-auto rtl:left-auto rtl:-right-[35px] rtl:sm:-right-[43px] w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-[var(--accent-color)]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <h3 className="font-display font-bold text-lg text-white mb-2">{t('workflow_step2_title')}</h3>
                    <p className="text-zinc-300 text-sm font-sans">{t('workflow_step2_desc')}</p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative will-change-transform will-change-opacity"
                >
                  <div className="absolute -left-[35px] sm:-left-[43px] rtl:-left-auto rtl:left-auto rtl:-right-[35px] rtl:sm:-right-[43px] w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-[var(--accent-color)]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <h3 className="font-display font-bold text-lg text-white mb-2">{t('workflow_step3_title')}</h3>
                    <p className="text-zinc-300 text-sm font-sans">{t('workflow_step3_desc')}</p>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative will-change-transform will-change-opacity"
                >
                  <div className="absolute -left-[35px] sm:-left-[43px] rtl:-left-auto rtl:left-auto rtl:-right-[35px] rtl:sm:-right-[43px] w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-[var(--accent-color)]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <h3 className="font-display font-bold text-lg text-white mb-2">{t('workflow_step4_title')}</h3>
                    <p className="text-zinc-300 text-sm font-sans">{t('workflow_step4_desc')}</p>
                  </div>
                </motion.div>

              </div>
            </div>
          )}

          {/* Featured Projects with High-Res Image Headers */}
          {sectionName === 'Featured Projects' && (
            <div className="space-y-6">
              {projectListWithImages.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-[var(--accent-color)]/50 transition-all overflow-hidden flex flex-col md:flex-row gap-5 p-5 group"
                >
                  {/* Image Preview Box */}
                  <div className="relative w-full md:w-64 aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg text-white font-display group-hover:text-[var(--accent-color)] transition-colors">
                          {proj.title}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded shrink-0">
                          {proj.stats}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-1">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((techItem) => (
                          <span key={techItem} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[var(--accent-color)]">
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-[#0b0b0c] font-bold text-xs font-mono hover:bg-[var(--accent-hover)] transition-colors inline-flex items-center gap-1.5 shrink-0"
                        >
                          <span>{t('visit_demo')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sectionName === 'Architecture & Stack' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
                {[
                  { id: 'all', label: t('stack_filter_all'), icon: Layers },
                  { id: 'frontend', label: t('stack_filter_frontend'), icon: Code2 },
                  { id: 'graphics', label: t('stack_filter_graphics'), icon: Sparkles },
                  { id: 'backend', label: t('stack_filter_backend'), icon: Server },
                  { id: 'devops', label: t('stack_filter_devops'), icon: Container },
                ].map((cat) => {
                  const CatIcon = cat.icon;
                  const isSelected = selectedStackCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedStackCategory(cat.id)}
                      className={`px-3.5 py-2.5 rounded-xl transition-all cursor-pointer font-medium whitespace-nowrap flex items-center gap-2 touch-manipulation min-h-[44px] ${
                        isSelected
                          ? 'bg-[var(--accent-color)] text-[#0b0b0c] font-bold shadow-md shadow-[rgba(var(--accent-rgb),0.25)] scale-[1.02]'
                          : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      <CatIcon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Clean Technologies Grid / List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { id: 'react', name: 'React 19', category: 'frontend', categoryLabel: 'Frontend', icon: Code2 },
                  { id: 'nextjs', name: 'Next.js App Router', category: 'frontend', categoryLabel: 'Frontend', icon: Globe },
                  { id: 'typescript', name: 'TypeScript', category: 'frontend', categoryLabel: 'Frontend', icon: ShieldCheck },
                  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'frontend', categoryLabel: 'Frontend', icon: Code2 },
                  { id: 'tailwind', name: 'Tailwind CSS v4', category: 'frontend', categoryLabel: 'Frontend', icon: Layout },
                  { id: 'framer', name: 'Framer Motion', category: 'frontend', categoryLabel: 'Frontend', icon: Sparkles },
                  { id: 'state', name: 'Zustand / Redux', category: 'frontend', categoryLabel: 'Frontend', icon: Layers3 },
                  { id: 'zod', name: 'Zod Validation', category: 'frontend', categoryLabel: 'Frontend', icon: Shield },
                  
                  { id: 'threejs', name: 'Three.js', category: 'graphics', categoryLabel: 'Graphics & 3D', icon: Box },
                  { id: 'webgl', name: 'WebGL 2.0', category: 'graphics', categoryLabel: 'Graphics & 3D', icon: Monitor },
                  { id: 'glsl', name: 'Custom GLSL Shaders', category: 'graphics', categoryLabel: 'Graphics & 3D', icon: Flame },
                  { id: 'r3f', name: 'React Three Fiber', category: 'graphics', categoryLabel: 'Graphics & 3D', icon: Sparkles },

                  { id: 'nodejs', name: 'Node.js', category: 'backend', categoryLabel: 'Backend', icon: Cpu },
                  { id: 'express', name: 'Express.js', category: 'backend', categoryLabel: 'Backend', icon: Server },
                  { id: 'websockets', name: 'WebSockets & Socket.io', category: 'backend', categoryLabel: 'Backend', icon: Zap },
                  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', categoryLabel: 'Backend', icon: Database },
                  { id: 'firestore', name: 'Firestore / Firebase', category: 'backend', categoryLabel: 'Backend', icon: HardDrive },
                  { id: 'redis', name: 'Redis Cache', category: 'backend', categoryLabel: 'Backend', icon: Gauge },

                  { id: 'docker', name: 'Docker Containers', category: 'devops', categoryLabel: 'DevOps', icon: Container },
                  { id: 'cloudrun', name: 'Google Cloud Run', category: 'devops', categoryLabel: 'DevOps', icon: Server },
                  { id: 'git', name: 'Git & GitHub Actions', category: 'devops', categoryLabel: 'DevOps', icon: Workflow },
                  { id: 'vite', name: 'Vite & ESBuild', category: 'devops', categoryLabel: 'DevOps', icon: Wrench },
                ]
                  .filter((item) => selectedStackCategory === 'all' || item.category === selectedStackCategory)
                  .map((tech) => {
                    const TechIcon = tech.icon;
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={tech.id}
                        className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-[var(--accent-color)]/60 transition-all duration-200 flex items-center gap-3 group shadow-sm hover:shadow-md"
                      >
                        <div className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-[var(--accent-color)] group-hover:scale-110 group-hover:bg-[rgba(var(--accent-rgb),0.15)] transition-all shrink-0">
                          <TechIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-display font-semibold text-xs sm:text-sm text-white group-hover:text-[var(--accent-color)] transition-colors truncate">
                            {tech.name}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate">
                            {tech.categoryLabel}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          )}

          {sectionName === 'Biography & Philosophy' && (
            <div className="space-y-5 sm:space-y-6">
              
              {/* 1. Header Profile Card */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.12)_0%,transparent_70%)] pointer-events-none" />
                
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[var(--accent-color)] shrink-0 shadow-lg shadow-[rgba(var(--accent-rgb),0.2)] bg-zinc-950 flex items-center justify-center p-1">
                  <img
                    src={BIO_PORTRAIT_FALLBACKS[bioImgIndex]}
                    alt="Kian Gasgary Floating Head"
                    onError={() => setBioImgIndex((prev) => (prev + 1 < BIO_PORTRAIT_FALLBACKS.length ? prev + 1 : prev))}
                    className="w-full h-full object-contain object-center transition-transform hover:scale-105 select-none"
                  />
                  <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-mono text-[var(--accent-color)] font-bold border border-zinc-700">
                    {t('available_status')}
                  </div>
                </div>

                <div className="space-y-3 text-center md:text-left rtl:md:text-right flex-1 w-full">
                  <div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-end gap-2">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wide">{t('hero_name')}</h3>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[rgba(var(--accent-rgb),0.15)] text-[var(--accent-color)] border border-[rgba(var(--accent-rgb),0.3)]">
                        {t('work_character')}
                      </span>
                    </div>
                  </div>

                  {/* Quick Working Traits Pills */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-end gap-1.5 sm:gap-2 pt-1 font-mono text-[10px] sm:text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                      {t('trait_1')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                      {t('trait_2')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                      {t('trait_3')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                      {t('trait_4')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 2. SECTION: 4 Core Working Pillars */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                    {t('how_i_work_title')}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Pillar 1: Teamwork & Synergy */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[var(--accent-color)]/50 transition-all space-y-2 group">
                    <div className="flex items-center gap-2 text-[var(--accent-color)] font-bold text-xs sm:text-sm font-mono">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.2)] group-hover:scale-110 transition-transform">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <span>{t('pillar_1_title')}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {t('pillar_1_desc')}
                    </p>
                  </div>

                  {/* Pillar 2: Problem Solving */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[var(--accent-color)]/50 transition-all space-y-2 group">
                    <div className="flex items-center gap-2 text-[var(--accent-color)] font-bold text-xs sm:text-sm font-mono">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.2)] group-hover:scale-110 transition-transform">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <span>{t('pillar_2_title')}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {t('pillar_2_desc')}
                    </p>
                  </div>

                  {/* Pillar 3: Clean Code & Architecture */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[var(--accent-color)]/50 transition-all space-y-2 group">
                    <div className="flex items-center gap-2 text-[var(--accent-color)] font-bold text-xs sm:text-sm font-mono">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.2)] group-hover:scale-110 transition-transform">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <span>{t('pillar_3_title')}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {t('pillar_3_desc')}
                    </p>
                  </div>

                  {/* Pillar 4: Product Ownership */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-[var(--accent-color)]/50 transition-all space-y-2 group">
                    <div className="flex items-center gap-2 text-[var(--accent-color)] font-bold text-xs sm:text-sm font-mono">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.2)] group-hover:scale-110 transition-transform">
                        <Target className="w-4 h-4" />
                      </div>
                      <span>{t('pillar_4_title')}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {t('pillar_4_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 3. SECTION: FIFA Player Card & Hexagonal Radar Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4 sm:space-y-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--accent-rgb),0.15)_0%,transparent_70%)] pointer-events-none" />

                  {/* Section Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2 text-white font-bold font-display text-sm sm:text-base">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-color)]" />
                      <span>{t('radar_header')}</span>
                    </div>
                  </div>

                  {/* FIFA FUT Container Grid */}
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-inner relative w-full overflow-hidden">
                    
                    {/* FIFA Stat Pills Switcher */}
                    <div className="w-full flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 font-mono text-xs">
                      {fifaAttributes.map((attr) => {
                        const isSelected = attr.id === activeFifaAttrId;
                        return (
                          <button
                            key={attr.id}
                            type="button"
                            onClick={() => {
                              setActiveFifaAttrId(attr.id);
                              setRadarSkillPopover(attr);
                            }}
                            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all font-bold cursor-pointer flex items-center gap-1.5 touch-manipulation active:scale-95 ${
                              isSelected
                                ? 'bg-[var(--accent-color)] text-[#0b0b0c] shadow-md shadow-[rgba(var(--accent-rgb),0.3)] font-extrabold'
                                : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/60'
                            }`}
                          >
                            <span>{attr.code}</span>
                            <span className={isSelected ? 'text-black font-extrabold' : 'text-[var(--accent-color)] font-bold'}>
                              {attr.val}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Responsive SVG Hexagonal Radar Chart Container */}
                    <div className="relative w-full max-w-[270px] sm:max-w-[320px] aspect-square flex items-center justify-center my-2">
                      <svg viewBox="0 0 320 320" className="w-full h-full overflow-visible">
                        <defs>
                          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.15" />
                          </radialGradient>
                          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Concentric Grid Lines */}
                        {[0.2, 0.4, 0.6, 0.8, 1.0].map((level) => (
                          <polygon
                            key={level}
                            points={getPolygonPoints(level)}
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1"
                            strokeDasharray={level === 1.0 ? 'none' : '2,2'}
                          />
                        ))}

                        {/* Spoke Rays */}
                        {fifaAttributes.map((_, i) => {
                          const { x, y } = getRadarPoint(i, 1.0);
                          return (
                            <line
                              key={i}
                              x1={radarCX}
                              y1={radarCY}
                              x2={x}
                              y2={y}
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1"
                            />
                          );
                        })}

                        {/* Player Polygon Filled Area */}
                        <polygon
                          points={playerPolygonPoints}
                          fill="url(#radarFill)"
                          stroke="var(--accent-color)"
                          strokeWidth="2.5"
                          filter="url(#radarGlow)"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Interactive Vertices and Labels */}
                        {fifaAttributes.map((attr, i) => {
                          const point = getRadarPoint(i, attr.val / 100);
                          const outerPoint = getRadarPoint(i, 1.22);
                          const isSelected = attr.id === activeFifaAttrId;

                          return (
                            <g 
                              key={attr.id} 
                              className="cursor-pointer group" 
                              onClick={() => {
                                setActiveFifaAttrId(attr.id);
                                setRadarSkillPopover(attr);
                              }}
                            >
                              {isSelected && (
                                <circle
                                  cx={point.x}
                                  cy={point.y}
                                  r={10}
                                  fill="none"
                                  stroke="var(--accent-color)"
                                  strokeWidth="1.5"
                                  opacity="0.5"
                                />
                              )}

                              <circle
                                cx={point.x}
                                cy={point.y}
                                r={isSelected ? 6.5 : 4.5}
                                fill={isSelected ? '#ffffff' : 'var(--accent-color)'}
                                stroke="var(--accent-color)"
                                strokeWidth={isSelected ? 3 : 1.5}
                                style={{
                                  transformBox: 'fill-box',
                                  transformOrigin: 'center',
                                }}
                                className="transition-all duration-200 group-hover:stroke-white group-hover:fill-white"
                              />

                              <text
                                x={outerPoint.x}
                                y={outerPoint.y + 4}
                                textAnchor="middle"
                                style={{
                                  transformBox: 'fill-box',
                                  transformOrigin: 'center',
                                }}
                                className={`text-[11px] font-mono font-bold transition-colors ${
                                  isSelected ? 'fill-[var(--accent-color)] font-extrabold' : 'fill-zinc-400 group-hover:fill-white'
                                }`}
                              >
                                {attr.code} {attr.val}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Clean, Quick Skill Explanation Popover Overlay */}
                  <AnimatePresence>
                    {radarSkillPopover && (
                      <div 
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                        onClick={() => setRadarSkillPopover(null)}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 12 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          onClick={(e) => e.stopPropagation()}
                          className="relative w-full max-w-sm sm:max-w-md p-5 rounded-2xl bg-zinc-900 border border-zinc-700/90 shadow-2xl space-y-4 font-sans text-left rtl:text-right"
                        >
                          {/* Close Button */}
                          <button
                            type="button"
                            onClick={() => setRadarSkillPopover(null)}
                            className="absolute top-3.5 right-3.5 rtl:left-3.5 rtl:right-auto p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                            aria-label="Close"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Skill Header */}
                          <div className="flex items-center gap-3.5 pr-6 rtl:pl-6 rtl:pr-0">
                            <div className="p-2.5 rounded-xl bg-[rgba(var(--accent-rgb),0.15)] text-[var(--accent-color)] border border-[rgba(var(--accent-rgb),0.3)] shrink-0">
                              {React.createElement(iconMap[radarSkillPopover.id] || Lightbulb, { className: 'w-5 h-5' })}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="font-display font-bold text-base text-white">
                                  {radarSkillPopover.name}
                                </h5>
                                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-[var(--accent-color)] border border-zinc-700/60">
                                  {radarSkillPopover.code} • {radarSkillPopover.val} OVR
                                </span>
                              </div>
                              <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                                {radarSkillPopover.category}
                              </span>
                            </div>
                          </div>

                          {/* Skill Explanation Box */}
                          <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[var(--accent-color)]">
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span>{t('core_strength_label')}</span>
                            </div>
                            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                              {radarSkillPopover.strength}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-end border-t border-zinc-800/80 pt-3 text-xs font-mono">
                            <button
                              type="button"
                              onClick={() => setRadarSkillPopover(null)}
                              className="px-4 py-1.5 rounded-lg bg-[var(--accent-color)] hover:opacity-90 text-[#0b0b0c] font-bold transition-all cursor-pointer text-xs"
                            >
                              {t('close')}
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>

              {/* SECTION: Core Personal Philosophy Principles */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold font-display text-xs sm:text-sm">
                  <MessageSquare className="w-4 h-4 text-[var(--accent-color)]" />
                  <span>{t('philosophy_title')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs italic text-zinc-300 font-sans">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
                    <p className="leading-relaxed">“{t('quote_1')}”</p>
                    <span className="text-[10px] font-mono not-italic text-[var(--accent-color)] font-bold block">— {t('quote_1_author')}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
                    <p className="leading-relaxed">“{t('quote_2')}”</p>
                    <span className="text-[10px] font-mono not-italic text-[var(--accent-color)] font-bold block">— {t('quote_2_author')}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
                    <p className="leading-relaxed">“{t('quote_3')}”</p>
                    <span className="text-[10px] font-mono not-italic text-[var(--accent-color)] font-bold block">— {t('quote_3_author')}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {sectionName === 'Contact & Collaboration' && (
            <div className="space-y-6 text-sm font-sans">
              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                <h3 className="font-display font-bold text-lg text-white">{t('contact_title')}</h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {t('contact_desc')}
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[rgba(var(--accent-rgb),0.15)] text-[var(--accent-color)] border border-[rgba(var(--accent-rgb),0.3)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px]">{t('direct_email')}</span>
                    <div className="text-[var(--accent-color)] font-bold text-sm">info@brunosimon.com</div>
                  </div>
                </div>
                <a
                  href="mailto:info@brunosimon.com"
                  className="px-4 py-2 rounded-xl bg-white text-[#0b0b0c] font-bold text-xs hover:bg-[var(--accent-color)] transition-colors text-center inline-flex items-center justify-center gap-2"
                  id="contact-email-btn"
                >
                  <span>{t('send_email')}</span>
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                </a>
              </div>

              {/* Social Media Contact Channels */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-wider font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('social_channels')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* GitHub */}
                  <a
                    href="https://github.com/brunosimon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-[var(--accent-color)]/60 transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                    id="contact-github-link"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-800 text-white group-hover:text-[var(--accent-color)] group-hover:bg-zinc-700 transition-colors">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-[var(--accent-color)] transition-colors">GitHub</div>
                        <span className="text-[11px] font-mono text-zinc-400">@brunosimon</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/bruno-simon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-[var(--accent-color)]/60 transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                    id="contact-linkedin-link"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-800 text-white group-hover:text-[var(--accent-color)] group-hover:bg-zinc-700 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-[var(--accent-color)] transition-colors">LinkedIn</div>
                        <span className="text-[11px] font-mono text-zinc-400">in/bruno-simon</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  {/* Twitter */}
                  <a
                    href="https://twitter.com/bruno_simon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-[var(--accent-color)]/60 transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                    id="contact-twitter-link"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-800 text-white group-hover:text-[var(--accent-color)] group-hover:bg-zinc-700 transition-colors">
                        <Twitter className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-[var(--accent-color)] transition-colors">Twitter (X)</div>
                        <span className="text-[11px] font-mono text-zinc-400">@bruno_simon</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

