'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'paper' | 'midnight' | 'sunlit' | 'cyberpunk' | 'sakura';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('paper');

  useEffect(() => {
    const savedTheme = localStorage.getItem('careersetu_theme') as Theme;
    if (savedTheme && ['paper', 'midnight', 'sunlit', 'cyberpunk', 'sakura'].includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('careersetu_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
