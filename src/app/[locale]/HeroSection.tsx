"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

export default function HeroSection() {
  const t = useTranslations();
  const { getBackgroundClass, getPrimaryColor, getSecondaryColor } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${getBackgroundClass()}`}
    >
      <main className="pt-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-6xl md:text-8xl font-bold mb-4 ${getPrimaryColor()}`}
          >
            {t("title")}
          </h1>
          <p className={`text-xl mt-8 ${getSecondaryColor()}`}>
            {t("subtitle")}
          </p>
        </div>
      </main>
    </div>
  );
}
