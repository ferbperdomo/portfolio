"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME,
  THEME_CONFIG,
  THEMES,
  type ThemeType,
} from "../constants/themes";

interface ThemeContextType {
  themeState: ThemeType;
  isDarkMode: boolean;
  handleThemeChange: (newThemeState: ThemeType) => void;
  getBackgroundClass: () => string;
  getTextClass: () => string;
  getPrimaryColor: () => string;
  getSecondaryColor: () => string;
  getAccentColor: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, setThemeState] = useState<ThemeType>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage, or use system preference if no saved theme
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme &&
      Object.values(THEMES).includes(Number(savedTheme) as ThemeType)
    ) {
      setThemeState(Number(savedTheme) as ThemeType);
    } else {
      // Use system preference if no saved theme
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT;
      setThemeState(systemTheme);
    }
    setMounted(true);
  }, []);

  const handleThemeChange = useCallback((newThemeState: ThemeType) => {
    setThemeState(newThemeState);
    localStorage.setItem("theme", newThemeState.toString());
  }, []);

  // Memoized theme configuration to avoid unnecessary re-renders
  const themeConfig = useMemo(() => THEME_CONFIG[themeState], [themeState]);

  const isDarkMode = useMemo(() => themeState === THEMES.DARK, [themeState]);

  const getBackgroundClass = useCallback(() => {
    if (!mounted) return "bg-black"; // Default to match server-side rendering
    return themeConfig.backgroundClass;
  }, [mounted, themeConfig.backgroundClass]);

  const getTextClass = useCallback(() => {
    if (!mounted) return "text-white"; // Default to match server-side rendering
    return themeConfig.textClass;
  }, [mounted, themeConfig.textClass]);

  const getPrimaryColor = useCallback(() => {
    if (!mounted) return "text-white";
    return themeConfig.primaryColor;
  }, [mounted, themeConfig.primaryColor]);

  const getSecondaryColor = useCallback(() => {
    if (!mounted) return "text-gray-300";
    return themeConfig.secondaryColor;
  }, [mounted, themeConfig.secondaryColor]);

  const getAccentColor = useCallback(() => {
    if (!mounted) return "bg-white";
    return themeConfig.accentColor;
  }, [mounted, themeConfig.accentColor]);

  return (
    <ThemeContext.Provider
      value={{
        themeState,
        isDarkMode,
        handleThemeChange,
        getBackgroundClass,
        getTextClass,
        getPrimaryColor,
        getSecondaryColor,
        getAccentColor,
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
