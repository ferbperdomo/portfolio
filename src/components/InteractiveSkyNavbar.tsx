"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

interface InteractiveSkyNavbarProps {
  onThemeChange?: (themeState: number) => void;
  className?: string;
}

const InteractiveSkyNavbar: React.FC<InteractiveSkyNavbarProps> = ({
  onThemeChange,
  className = "",
}) => {
  const [themeState, setThemeState] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialThemeState = mediaQuery.matches ? 2 : 0;

    setThemeState(initialThemeState);

    const initialPosition = initialThemeState === 0 ? 0 : 32;
    dragX.set(initialPosition);

    onThemeChange?.(initialThemeState);

    setIsInitialized(true);

    const handleChange = (e: MediaQueryListEvent) => {
      const newThemeState = e.matches ? 2 : 0;
      setThemeState(newThemeState);
      dragX.set(newThemeState === 0 ? 0 : 32);
      onThemeChange?.(newThemeState);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dragX, onThemeChange]);

  const sunOpacity = useTransform(dragX, [0, 16, 32], [1, 0, 0]);
  const starOpacity = useTransform(dragX, [0, 16, 32], [0, 1, 0]);
  const moonOpacity = useTransform(dragX, [0, 16, 32], [0, 0, 1]);

  const handleThemeChange = (newThemeState: number) => {
    setThemeState(newThemeState);
    onThemeChange?.(newThemeState);

    if (newThemeState === 2) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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

    if (newThemeState !== themeState) {
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
      src="/cross.png"
      alt="Cruz"
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
      <div className="relative w-16 h-8 bg-transparent rounded-full border border-gray-400 dark:border-gray-500">
        <motion.div
          className="absolute top-0.5 left-0.5 w-7 h-7 cursor-grab active:cursor-grabbing z-10 flex items-center justify-center"
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

export default InteractiveSkyNavbar;
