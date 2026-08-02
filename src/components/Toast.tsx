import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#18181b] border border-[rgba(var(--accent-rgb),0.4)] text-white font-mono text-xs shadow-2xl backdrop-blur-md"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[var(--accent-color)]" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-color)]" />
          )}
          <span>{toast.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
