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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30 transition-all duration-1000 ${
          isMenuOpen ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
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

          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <ThemeToggle
              currentTheme={themeState}
              onThemeChange={(themeState: number) =>
                handleThemeChange(themeState as 0 | 1 | 2)
              }
              className="h-8"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-8 h-8 flex items-center justify-center group md:hidden"
              aria-label={
                isMenuOpen
                  ? t("navigation.closeMenu")
                  : t("navigation.openMenu")
              }
              title={
                isMenuOpen
                  ? t("navigation.closeMenuTitle")
                  : t("navigation.openMenuTitle")
              }
            >
              {isMenuOpen ? (
                <Image
                  src="/cross.png"
                  alt="Close menu"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              ) : (
                <div className="flex flex-col justify-center items-center space-y-1">
                  <div className={`w-4 h-0.5 ${getAccentColor()}`} />
                  <div className={`w-4 h-0.5 ${getAccentColor()}`} />
                  <div className={`w-4 h-0.5 ${getAccentColor()}`} />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-40 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isDarkMode ? "bg-gray-800/80" : "bg-white/80"
          }`}
          style={{
            backgroundColor:
              themeState === 0
                ? "rgba(254, 247, 237, 0.8)"
                : themeState === 1
                ? "rgba(187, 247, 208, 0.8)"
                : "rgba(42, 42, 42, 0.8)",
          }}
        >
          <div className="flex flex-col h-full justify-center items-center space-y-8 pt-20 pb-20">
            {/* Theme Toggle */}
            <div className="mb-8">
              <ThemeToggle
                currentTheme={themeState}
                onThemeChange={(themeState: number) =>
                  handleThemeChange(themeState as 0 | 1 | 2)
                }
                className="h-12"
              />
            </div>

            <a
              href="#"
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.home")}
            </a>
            <a
              href="#"
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.projects")}
            </a>
            <a
              href="#"
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.contact")}
            </a>
            <div className="mt-8">
              <LanguageSelector />
            </div>

            {/* Close button at the bottom */}
            <div className="mt-16">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-4 rounded-full transition-all duration-200 hover:bg-white/20"
                aria-label={t("navigation.closeMenu")}
                title={t("navigation.closeMenuTitle")}
              >
                <Image
                  src="/cross.png"
                  alt="Close menu"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
