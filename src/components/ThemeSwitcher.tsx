'use client';

import { useTheme, Theme } from '@/context/ThemeContext';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes: { id: Theme; label: string; color: string }[] = [
    { id: 'paper', label: 'Paper Corkboard', color: '#F2A900' },
    { id: 'midnight', label: 'Midnight Forest', color: '#091A14' },
    { id: 'sunlit', label: 'Sunlit Amber', color: '#FF9900' },
    { id: 'cyberpunk', label: 'Cyberpunk Neon', color: '#00F2FE' },
    { id: 'sakura', label: 'Sakura Blossom', color: '#FF80BF' }
  ];

  const activeTheme = themes.find(t => t.id === theme) || themes[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="glass-card px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 border border-moss-light shadow-sm hover:border-marigold transition-all text-pine"
      >
        <span className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0" style={{ backgroundColor: activeTheme.color }} />
        <span className="hidden sm:inline font-heading">{activeTheme.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-moss transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-moss-light z-50 space-y-1"
          >
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-moss-dark border-b border-moss-light/50 flex items-center gap-1">
              <Palette className="w-3 h-3 text-marigold" /> Choose Aesthetic
            </div>

            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${theme === t.id ? 'bg-pine text-white' : 'text-pine hover:bg-moss-light/40'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: t.color }} />
                  <span>{t.label}</span>
                </div>
                {theme === t.id && <Check className="w-3.5 h-3.5 text-marigold" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
