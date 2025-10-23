"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

import type { MotionValue } from "framer-motion";

interface HistorySectionProps {
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  y3: MotionValue<number>;
  x1: MotionValue<number>;
  x2: MotionValue<number>;
  opacity1: MotionValue<number>;
  opacity2: MotionValue<number>;
  opacity3: MotionValue<number>;
  scale1: MotionValue<number>;
}

export default function HistorySection({ y2, opacity1 }: HistorySectionProps) {
  const t = useTranslations();
  const { themeState, getPrimaryColor, getSecondaryColor } = useTheme();

  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-4 overflow-hidden"
      style={{
        backgroundColor:
          themeState === 0
            ? "var(--color-wine-50)"
            : themeState === 1
            ? "var(--color-mint-100)"
            : "var(--color-primary-black-light)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="floating-element-1 relative md:col-span-1" style={{ y: y2 }}>
            <div
              className="w-64 h-64 rounded-full opacity-20"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "var(--color-wine-200)"
                    : themeState === 1
                    ? "var(--color-mint-300)"
                    : "var(--color-primary-black-lighter)",
                transform: "rotate(15deg)",
              }}
            />
            <div
              className="absolute top-8 left-8 w-32 h-32 rounded-full opacity-30"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "var(--color-wine-300)"
                    : themeState === 1
                    ? "var(--color-mint-400)"
                    : "var(--color-primary-black-lighter)",
                transform: "rotate(-10deg)",
              }}
            />
          </motion.div>

          <motion.div
            className="floating-element-2 space-y-6 md:col-span-2"
            style={{ opacity: opacity1 }}
          >
            <h2
              className={`text-4xl md:text-6xl font-bold mb-8 ${getPrimaryColor()}`}
            >
              {t("historia.title")}
            </h2>
            <motion.div
              className={`space-y-6 ${getSecondaryColor()}`}
              style={{ opacity: opacity1 }}
            >
              <p className="text-lg leading-relaxed">{t("historia.text1")}</p>
              <p className="text-lg leading-relaxed">{t("historia.text2")}</p>
              <p className="text-lg leading-relaxed">{t("historia.text3")}</p>
              <p className="text-lg leading-relaxed">{t("historia.text4")}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
