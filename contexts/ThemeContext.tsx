'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeColor = 'red' | 'blue' | 'green';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>('red');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('themeColor') as ThemeColor | null;
    if (saved && ['red', 'blue', 'green'].includes(saved)) {
      setThemeColorState(saved);
    }
  }, []);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeColor', color);
    }
  };

  // Always provide context, even during SSR
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

