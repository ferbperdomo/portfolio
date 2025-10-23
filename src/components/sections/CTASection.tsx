"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

import type { MotionValue } from "framer-motion";

interface CTASectionProps {
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

export default function CTASection({
  y2,
  y3,
  x1,
  x2,
  opacity2,
  opacity3,
  scale1,
}: CTASectionProps) {
  const t = useTranslations();
  const { themeState, getPrimaryColor, getSecondaryColor } = useTheme();

  const getButtonStyle = () => {
    if (themeState === 0) {
      return "bg-primary-wine text-white hover:bg-wine-700 shadow-lg hover:shadow-wine-500/25";
    } else if (themeState === 1) {
      return "bg-primary-mint text-white hover:bg-mint-600 shadow-lg hover:shadow-mint-500/25";
    } else {
      return "bg-primary-black text-white hover:bg-black-lighter shadow-lg hover:shadow-black/25";
    }
  };

  return (
    <section
      className="relative py-32 px-8 md:px-4 pb-40"
      style={{
        backgroundColor:
          themeState === 0
            ? "var(--color-wine-200)"
            : themeState === 1
            ? "var(--color-mint-800)"
            : "var(--color-primary-black)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="floating-element-1 absolute top-20 left-20 w-32 h-32 rounded-full opacity-10"
          style={{
            y: y2,
            x: x1,
            backgroundColor:
              themeState === 0
                ? "var(--color-wine-300)"
                : themeState === 1
                ? "var(--color-mint-400)"
                : "var(--color-primary-black-lighter)",
          }}
        />
        <motion.div
          className="floating-element-2 absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-15"
          style={{
            y: y3,
            x: x2,
            backgroundColor:
              themeState === 0
                ? "var(--color-wine-400)"
                : themeState === 1
                ? "var(--color-mint-500)"
                : "var(--color-primary-black-lighter)",
          }}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-8 ${getPrimaryColor()}`}
            style={{ opacity: opacity2, scale: scale1 }}
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${getSecondaryColor()}`}
            style={{ opacity: opacity3 }}
          >
            {t("cta.subtitle")}
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:cristian@example.com"
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${getButtonStyle()}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("cta.contact")}
            </motion.a>
            <motion.a
              href="#projects"
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 border-2 ${
                themeState === 0
                  ? "border-primary-wine text-primary-wine hover:bg-primary-wine hover:text-white"
                  : themeState === 1
                  ? "border-primary-mint text-primary-mint hover:bg-primary-mint hover:text-white"
                  : "border-primary-black text-primary-black hover:bg-primary-black hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("cta.projects")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
