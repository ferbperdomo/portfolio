"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";
import { translateRoute } from "../utils/routeMapping";

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const { themeState } = useTheme();

  // Extract locale from pathname
  const locale = pathname.split("/")[1] || "es";

  // Get appropriate colors for the current theme using brand colors
  const getActiveButtonClass = () => {
    switch (themeState) {
      case 0: // Light theme
        return "bg-primary-wine text-white"; // Wine color
      case 1: // Medium theme
        return "bg-primary-wine text-white"; // Wine color
      case 2: // Dark theme
        return "bg-primary-wine text-white"; // Wine color
      default:
        return "bg-primary-wine text-white";
    }
  };

  const getInactiveButtonClass = () => {
    switch (themeState) {
      case 0: // Light theme
        return "text-primary-wine hover:bg-primary-wine/10"; // Wine color with opacity
      case 1: // Medium theme
        return "text-primary-wine hover:bg-primary-wine/10"; // Wine color with opacity
      case 2: // Dark theme
        return "text-white hover:bg-white/20";
      default:
        return "text-white hover:bg-white/20";
    }
  };

  const handleLanguageChange = (newLocale: string) => {
    // Translate the route including route name translation
    const translatedPath = translateRoute(pathname, newLocale);
    // Navigate to the translated path
    router.push(translatedPath);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange("es")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          locale === "es" ? getActiveButtonClass() : getInactiveButtonClass()
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          locale === "en" ? getActiveButtonClass() : getInactiveButtonClass()
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
