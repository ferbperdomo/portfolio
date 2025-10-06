"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ThemeContextType {
  themeState: number;
  isDarkMode: boolean;
  handleThemeChange: (newThemeState: number) => void;
  getBackgroundClass: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, setThemeState] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = useCallback((newThemeState: number) => {
    setThemeState(newThemeState);
    setIsDarkMode(newThemeState === 2);
  }, []);

  const getBackgroundClass = () => {
    switch (themeState) {
      case 0:
        return "bg-theme-light";
      case 1:
        return "bg-theme-medium";
      case 2:
        return "bg-theme-dark";
      default:
        return "bg-theme-light";
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeState,
        isDarkMode,
        handleThemeChange,
        getBackgroundClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
