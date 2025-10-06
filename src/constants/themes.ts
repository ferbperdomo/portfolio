export const THEMES = {
  LIGHT: 0,
  MEDIUM: 1,
  DARK: 2,
} as const;

export type ThemeType = (typeof THEMES)[keyof typeof THEMES];

export const THEME_CONFIG = {
  [THEMES.LIGHT]: {
    name: "light",
    backgroundClass: "bg-theme-light",
    textClass: "text-black",
    primaryColor: "text-gray-900",
    secondaryColor: "text-gray-700",
    accentColor: "bg-gray-800",
  },
  [THEMES.MEDIUM]: {
    name: "medium",
    backgroundClass: "bg-theme-medium",
    textClass: "text-black",
    primaryColor: "text-[#7c3a43]",
    secondaryColor: "text-[#7c3a43]",
    accentColor: "bg-[#7c3a43]",
  },
  [THEMES.DARK]: {
    name: "dark",
    backgroundClass: "bg-theme-dark",
    textClass: "text-white",
    primaryColor: "text-white",
    secondaryColor: "text-gray-300",
    accentColor: "bg-white",
  },
} as const;

export const DEFAULT_THEME = THEMES.DARK;
