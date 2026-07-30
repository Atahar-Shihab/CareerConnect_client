'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'paper' ? 'midnight' : 'paper');
  };

  return (
    <button
      onClick={toggleTheme}
      className="glass-card w-10 h-10 rounded-full flex items-center justify-center border border-moss-light shadow-sm hover:border-marigold transition-all text-pine relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'paper' ? (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-marigold" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-pine-light" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
