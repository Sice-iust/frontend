import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';  

// Define the shape of context  
interface ThemeContextType {  
  isDarkMode: boolean;  
  toggleDarkMode: () => void;  
}  

// Create the context with default values  
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);  

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {  
    return JSON.parse(localStorage.getItem('isDarkMode') || 'false');  
  });  

  const toggleDarkMode = () => {  
    setIsDarkMode(prev => !prev);  
  };  

  useEffect(() => {  
    const body = document.body;  
    body.classList.toggle('dark', isDarkMode);  
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode)); // Persist in local storage  
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
    throw new Error("useTheme must be used within a ThemeProvider");  
  }  
  
  return context;  
};  