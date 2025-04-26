// contexts/ThemeContext.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type ThemeContextType = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setIsDarkMode(savedMode ? savedMode === 'true' : prefersDark)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)