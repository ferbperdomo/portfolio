"use client";

import { motion, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

interface HistorySectionProps {
  y1: any;
  y2: any;
  y3: any;
  x1: any;
  x2: any;
  opacity1: any;
  opacity2: any;
  opacity3: any;
  scale1: any;
}

export default function HistorySection({
  y1,
  y2,
  y3,
  x1,
  x2,
  opacity1,
  opacity2,
  opacity3,
  scale1,
}: HistoriaSectionProps) {
  const t = useTranslations();
  const { themeState, getPrimaryColor, getSecondaryColor } = useTheme();

  return (
    <section
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
          className="grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="floating-element-1 relative"
            style={{ y: y2 }}
          >
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
            className="floating-element-2 space-y-6"
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
