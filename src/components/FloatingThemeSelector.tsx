"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface FloatingThemeSelectorProps {
  currentTheme: number;
  onThemeChange: (theme: number) => void;
}

const THEME_CONFIG = [
  {
    id: 0,
    name: "Light",
    color: "var(--color-wine-50)",
    icon: "/sun.png",
    alt: "Sol",
  },
  {
    id: 1,
    name: "Medium",
    color: "var(--color-mint-200)",
    icon: "/earring.png",
    alt: "Earring",
  },
  {
    id: 2,
    name: "Dark",
    color: "var(--color-primary-black-lighter)",
    icon: "/moon.png",
    alt: "Luna",
  },
];

export default function FloatingThemeSelector({
  currentTheme,
  onThemeChange,
}: FloatingThemeSelectorProps) {
  const { scrollYProgress } = useScroll();

  // El selector se mueve suavemente hacia abajo con el scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      className="fixed left-4 top-10 z-50 flex flex-col gap-3 md:gap-4"
      style={{ y }}
    >
      {THEME_CONFIG.map((theme) => (
        <motion.button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className="relative w-10 h-10 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 shadow-lg hover:scale-110"
          style={{
            backgroundColor: theme.color,
            borderColor: "transparent",
            borderWidth: "2px",
            boxShadow:
              currentTheme === theme.id
                ? "0 0 0 2px rgba(var(--color-primary-wine), 0.3), 0 0 20px rgba(var(--color-primary-wine), 0.4)"
                : "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: currentTheme === theme.id ? 1.1 : 1,
          }}
          title={`Tema ${theme.name}`}
        >
          {/* Icono flotante dentro del círculo */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={theme.icon}
              alt={theme.alt}
              width={20}
              height={20}
              className="object-contain w-8 h-8 md:w-10 md:h-10"
            />
          </motion.div>

          {/* Ring difuminado de selección */}
          {currentTheme === theme.id && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 0 3px rgba(var(--color-primary-wine), 0.3)",
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
