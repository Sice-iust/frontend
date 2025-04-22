'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to false during SSR

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
      setIsDarkMode(storedDarkMode);

      const body = document.body;
      body.classList.toggle('dark', storedDarkMode);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      body.classList.toggle('dark', isDarkMode);
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
