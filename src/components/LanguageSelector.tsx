"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";

export function LanguageSelector() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { getPrimaryColor, getAccentColor, themeState } = useTheme();

  // Extract locale from pathname
  const locale = pathname.split("/")[1] || "es";

  // Get appropriate colors for the current theme using brand colors
  const getActiveButtonClass = () => {
    switch (themeState) {
      case 0: // Light theme
        return "bg-wine-primary text-white"; // Wine color
      case 1: // Medium theme
        return "bg-wine-primary text-white"; // Wine color
      case 2: // Dark theme
        return "bg-wine-primary text-white"; // Wine color
      default:
        return "bg-wine-primary text-white";
    }
  };

  const getInactiveButtonClass = () => {
    switch (themeState) {
      case 0: // Light theme
        return "text-wine-primary hover:bg-wine-primary/10"; // Wine color with opacity
      case 1: // Medium theme
        return "text-wine-primary hover:bg-wine-primary/10"; // Wine color with opacity
      case 2: // Dark theme
        return "text-white hover:bg-white/20";
      default:
        return "text-white hover:bg-white/20";
    }
  };

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
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
