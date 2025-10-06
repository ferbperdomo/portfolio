"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeState, setThemeState] = useState(0);

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
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isDarkMode ? "dark" : ""
      } ${getBackgroundClass()}`}
    >
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
              className={`font-semibold text-lg drop-shadow-lg ${
                themeState === 0
                  ? "text-gray-900"
                  : themeState === 1
                  ? "text-white"
                  : "text-white"
              }`}
            ></span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <ThemeToggle
              currentTheme={themeState}
              onThemeChange={handleThemeChange}
              className="h-8"
            />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex items-center justify-center group md:hidden"
            aria-label="Abrir menú de navegación"
            title="Abrir menú"
          >
            <div className="flex flex-col justify-center items-center space-y-1">
              <div
                className={`w-4 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "rotate-45 translate-y-0.5"
                    : "rotate-0 translate-y-0"
                } ${isDarkMode ? "bg-white" : "bg-gray-800"}`}
              />
              <div
                className={`w-4 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                } ${isDarkMode ? "bg-white" : "bg-gray-800"}`}
              />
              <div
                className={`w-4 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-0.5"
                    : "rotate-0 translate-y-0"
                } ${isDarkMode ? "bg-white" : "bg-gray-800"}`}
              />
            </div>
          </button>
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
              Lorem Ipsum Dolor
            </a>
            <a
              href="#"
              className={`block px-6 py-3 transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700/50"
                  : "text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              Sit Amet Consectetur
            </a>
            <a
              href="#"
              className={`block px-6 py-3 transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700/50"
                  : "text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              Adipiscing Elit Sed
            </a>
            <a
              href="#"
              className={`block px-6 py-3 transition-colors ${
                isDarkMode
                  ? "text-white hover:bg-gray-700/50"
                  : "text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              Do Eiusmod Tempor
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-6xl md:text-8xl font-bold mb-4 ${
              themeState === 0
                ? "text-gray-900"
                : themeState === 1
                ? "text-white"
                : "text-white"
            }`}
          >
            Cristian Perdomo
          </h1>
          <p
            className={`text-xl mt-8 ${
              themeState === 0
                ? "text-gray-700"
                : themeState === 1
                ? "text-gray-200"
                : "text-gray-300"
            }`}
          >
            Desarrollador Full Stack • Innovador Digital
          </p>
        </div>
      </main>
    </div>
  );
}
