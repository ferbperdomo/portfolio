"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

export default function HeroSection() {
  const t = useTranslations();
  const { themeState, getBackgroundClass } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${getBackgroundClass()}`}
    >
      <main className="pt-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-6xl md:text-8xl font-bold mb-4 ${
              themeState === 0
                ? "text-gray-900"
                : themeState === 1
                ? "text-[#7c3a43]"
                : "text-white"
            }`}
          >
            {t("title")}
          </h1>
          <p
            className={`text-xl mt-8 ${
              themeState === 0
                ? "text-gray-700"
                : themeState === 1
                ? "text-[#7c3a43]"
                : "text-gray-300"
            }`}
          >
            {t("subtitle")}
          </p>
        </div>
      </main>
    </div>
  );
}
