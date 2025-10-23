"use client";

import { motion, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

interface HeroSectionProps {
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

export default function HeroSection({
  y1,
  y2,
  y3,
  x1,
  x2,
  opacity1,
  opacity2,
  opacity3,
  scale1,
}: HeroSectionProps) {
  const t = useTranslations();
  const { themeState, getPrimaryColor, getSecondaryColor } = useTheme();

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        <div
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/test.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px) brightness(0.7) contrast(1.1) saturate(0.8)",
            transform: "scale(1.05)",
          }}
        />
        {/* Artistic overlay with subtle gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              ${
                themeState === 0
                  ? "rgba(124, 58, 67, 0.15)"
                  : themeState === 1
                  ? "rgba(88, 194, 158, 0.15)"
                  : "rgba(42, 42, 42, 0.15)"
              } 0%, 
              transparent 50%, 
              ${
                themeState === 0
                  ? "rgba(249, 212, 175, 0.1)"
                  : themeState === 1
                  ? "rgba(187, 247, 208, 0.1)"
                  : "rgba(26, 26, 26, 0.1)"
              } 100%)`,
            mixBlendMode: "overlay",
          }}
        />
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
        style={{
          y: y2,
          x: x1,
          backgroundColor:
            themeState === 0
              ? "var(--color-wine-50)"
              : themeState === 1
              ? "var(--color-mint-200)"
              : "var(--color-primary-black-lighter)",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-30"
        style={{
          y: y3,
          x: x2,
          backgroundColor:
            themeState === 0
              ? "var(--color-wine-50)"
              : themeState === 1
              ? "var(--color-mint-200)"
              : "var(--color-primary-black-lighter)",
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="hero-title relative z-10 text-center px-4"
        style={{ opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className={`text-6xl md:text-8xl font-bold mb-6 ${getPrimaryColor()}`}
          style={{ opacity: 1, scale: 1 }}
        >
          {t("hero.name")}
        </motion.h1>
        <motion.p
          className={`text-xl md:text-2xl ${getSecondaryColor()} max-w-2xl mx-auto leading-relaxed`}
          style={{ opacity: 1, scale: 1 }}
        >
          {t("hero.subtitle")}
        </motion.p>
      </motion.div>
    </section>
  );
}
