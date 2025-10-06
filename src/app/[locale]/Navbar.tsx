"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { LanguageSelector } from "../../components/LanguageSelector";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";

export default function Navbar() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isDarkMode,
    handleThemeChange,
    getPrimaryColor,
    getAccentColor,
    themeState,
  } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30 transition-all duration-1000">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Cristian Perdomo Logo"
            width={80}
            height={60}
            className="w-12 h-9"
          />
          <span
            className={`font-semibold text-lg drop-shadow-lg ${getPrimaryColor()}`}
          >
            {t("title")}
          </span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <ThemeToggle
            currentTheme={themeState}
            onThemeChange={(themeState: number) =>
              handleThemeChange(themeState as 0 | 1 | 2)
            }
            className="h-8"
          />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex items-center justify-center group md:hidden"
            aria-label={t("navigation.openMenu")}
            title={t("navigation.openMenuTitle")}
          >
            <div className="flex flex-col justify-center items-center space-y-1">
              <div
                className={`w-4 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "rotate-45 translate-y-0.5"
                    : "rotate-0 translate-y-0"
                } ${getAccentColor()}`}
              />
              <div
                className={`w-4 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                } ${getAccentColor()}`}
              />
              <div
                className={`w-4 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-0.5"
                    : "rotate-0 translate-y-0"
                } ${getAccentColor()}`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`absolute top-full left-4 right-4 mt-2 backdrop-blur-md rounded-2xl border overflow-hidden transition-all duration-300 ease-in-out ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700/30"
            : "bg-white/80 border-gray-200/30"
        } ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="py-2">
          <a
            href="#"
            className={`block px-6 py-3 transition-colors ${
              isDarkMode
                ? "text-white hover:bg-gray-700/50"
                : "text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            {t("menu.home")}
          </a>
          <a
            href="#"
            className={`block px-6 py-3 transition-colors ${
              isDarkMode
                ? "text-white hover:bg-gray-700/50"
                : "text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            {t("menu.projects")}
          </a>
          <a
            href="#"
            className={`block px-6 py-3 transition-colors ${
              isDarkMode
                ? "text-white hover:bg-gray-700/50"
                : "text-gray-900 hover:bg-gray-100/50"
            }`}
          >
            {t("menu.contact")}
          </a>
          <div className="px-6 py-3 border-t border-gray-200/30 dark:border-gray-700/30">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
