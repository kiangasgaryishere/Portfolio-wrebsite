import React from 'react';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { name: 'Twitter (X)', url: 'https://twitter.com/bruno_simon', label: 'Twitter', Icon: Twitter },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/bruno-simon', label: 'LinkedIn', Icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com/brunosimon', label: 'GitHub', Icon: Github },
];

export const HeroFooter: React.FC = () => {
  return (
    <footer className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-6 pt-3 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400 select-none">
      
      {/* Bottom Left Column */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex items-center font-mono text-xs sm:text-sm"
      >
        <span className="text-zinc-400 font-mono text-xs sm:text-sm tracking-wider">
          © 2026 kian gasgary
        </span>
      </motion.div>

      {/* Bottom Right Column */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center gap-3"
      >
        {/* Social links - Icons only */}
        <div className="flex items-center gap-2.5">
          {socialLinks.map((link) => {
            const Icon = link.Icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                aria-label={link.name}
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 hover:border-[var(--accent-color)]/50 text-zinc-400 hover:text-[var(--accent-color)] transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group shadow-sm touch-manipulation min-w-[44px] min-h-[44px]"
                id={`social-${link.label.toLowerCase()}`}
              >
                <Icon className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
              </a>
            );
          })}
        </div>
      </motion.div>

    </footer>
  );
};


