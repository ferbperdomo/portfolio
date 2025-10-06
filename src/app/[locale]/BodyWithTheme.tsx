"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface BodyWithThemeProps {
  children: React.ReactNode;
}

export function BodyWithTheme({ children }: BodyWithThemeProps) {
  const { themeState } = useTheme();
  const previousClasses = useRef<string[]>([]);

  useEffect(() => {
    const bodyElement = document.body;
    if (!bodyElement) return;

    // Get classes based on theme state directly
    let newBackgroundClass, newTextClass;

    switch (themeState) {
      case 0:
        newBackgroundClass = "bg-theme-light";
        newTextClass = "text-black";
        break;
      case 1:
        newBackgroundClass = "bg-theme-medium";
        newTextClass = "text-black";
        break;
      case 2:
        newBackgroundClass = "bg-theme-dark";
        newTextClass = "text-white";
        break;
      default:
        newBackgroundClass = "bg-theme-light";
        newTextClass = "text-black";
    }

    const newClasses = [newBackgroundClass, newTextClass];

    console.log("BodyWithTheme: Applying classes:", newClasses);

    // Only update if classes have changed
    if (
      JSON.stringify(previousClasses.current) !== JSON.stringify(newClasses)
    ) {
      console.log("BodyWithTheme: Classes changed, updating...");

      // Remove previous theme classes
      if (previousClasses.current.length > 0) {
        bodyElement.classList.remove(...previousClasses.current);
      }

      // Add new theme classes
      bodyElement.classList.add(...newClasses);

      // Update ref
      previousClasses.current = newClasses;
    }
  }, [themeState]);

  return <>{children}</>;
}
