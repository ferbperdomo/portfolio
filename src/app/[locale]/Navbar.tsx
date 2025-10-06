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
      <div
        className={`fixed top-6 left-6 z-[9999] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ position: "fixed", top: "24px", left: "24px", zIndex: 9999 }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-10 h-10 flex items-center justify-center group transition-all duration-200"
          style={{ transform: "none" }}
          aria-label={t("navigation.openMenu")}
          title={t("navigation.openMenuTitle")}
        >
          <div className="flex flex-col justify-center items-center space-y-1">
            <div className="w-5 h-0.5 bg-[#7c3a43] transition-all duration-200" />
            <div className="w-5 h-0.5 bg-[#7c3a43] transition-all duration-200" />
            <div className="w-5 h-0.5 bg-[#7c3a43] transition-all duration-200" />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[100] backdrop-blur-lg transition-all duration-300 ease-in-out ${
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
          <div className="flex flex-col h-screen justify-center items-center space-y-8 px-6 py-20 w-full">
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
