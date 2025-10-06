"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ThemeToggleProps {
  currentTheme: number;
  onThemeChange?: (themeState: number) => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
  className = "",
}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const dragX = useMotionValue(0);

  useEffect(() => {
    // Sync toggle position with current theme
    const position = currentTheme === 0 ? 0 : currentTheme === 1 ? 16 : 32;
    dragX.set(position);
    setIsInitialized(true);
  }, [currentTheme, dragX]);

  // Get the gradient colors based on current theme
  const getGradientColors = () => {
    // Always show the three theme colors in the gradient
    return "linear-gradient(to right, #fef7ed, #bbf7d0, #2a2a2a)";
  };

  const sunOpacity = useTransform(dragX, [0, 16, 32], [1, 0, 0]);
  const starOpacity = useTransform(dragX, [0, 16, 32], [0, 1, 0]);
  const moonOpacity = useTransform(dragX, [0, 16, 32], [0, 0, 1]);

  const handleThemeChange = (newThemeState: number) => {
    onThemeChange?.(newThemeState);
  };

  const handleDragEnd = () => {
    const newX = dragX.get();

    let newThemeState;
    if (newX <= 10) {
      newThemeState = 0;
    } else if (newX <= 21) {
      newThemeState = 1;
    } else {
      newThemeState = 2;
    }

    if (newThemeState !== currentTheme) {
      handleThemeChange(newThemeState);
    }
  };

  const SunIcon = () => (
    <motion.img
      src="/sun.png"
      alt="Sol"
      width="28"
      height="28"
      className="object-contain pointer-events-none"
      style={{ opacity: sunOpacity }}
    />
  );

  const MoonIcon = () => (
    <motion.img
      src="/moon.png"
      alt="Luna"
      width="28"
      height="28"
      className="object-contain pointer-events-none"
      style={{ opacity: moonOpacity }}
    />
  );

  const StarIcon = () => (
    <motion.img
      src="/earring.png"
      alt="Earring"
      width="28"
      height="28"
      className="object-contain pointer-events-none"
      style={{ opacity: starOpacity }}
    />
  );

  if (!isInitialized) {
    return (
      <div className={`h-20 flex items-center justify-center ${className}`}>
        <div className="w-32 h-8 bg-gray-300 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-16 h-8 rounded-full border border-gray-400 dark:border-gray-500 overflow-hidden">
        {/* Fondo degradado con los tres colores del tema */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: getGradientColors(),
          }}
        />
        <motion.div
          className="absolute top-0.5 left-0.5 w-7 h-7 cursor-grab active:cursor-grabbing z-10 flex items-center justify-center rounded-full"
          drag="x"
          dragConstraints={{
            left: 0,
            right: 32,
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          whileDrag={{ scale: 1.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: sunOpacity }}
          >
            <SunIcon />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: starOpacity }}
          >
            <StarIcon />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: moonOpacity }}
          >
            <MoonIcon />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeToggle;
