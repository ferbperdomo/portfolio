"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import FloatingThemeSelector from "../../components/FloatingThemeSelector";
import CTASection from "../../components/sections/CTASection";
import HeroSection from "../../components/sections/HeroSection";
import HistorySection from "../../components/sections/HistorySection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "./Navbar";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { themeState, handleThemeChange, getBackgroundClass } = useTheme();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms - DESACTIVADOS temporalmente
  const y1 = useTransform(smoothProgress, [0, 1], [0, 0]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 0]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, 0]);
  const x1 = useTransform(smoothProgress, [0, 0.5, 1], [0, 0, 0]);
  const x2 = useTransform(smoothProgress, [0, 0.5, 1], [0, 0, 0]);

  // Opacity transforms - Sin desaparición al final
  const opacity1 = useTransform(smoothProgress, [0, 0.2, 1], [0, 1, 1]);
  const opacity2 = useTransform(smoothProgress, [0, 0.3, 1], [0, 1, 1]);
  const opacity3 = useTransform(smoothProgress, [0, 0.4, 1], [0, 1, 1]);

  // Scale transforms
  const scale1 = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(
        ".hero-title",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating elements
      gsap.fromTo(
        ".floating-element-1",
        { x: -200, y: 100, opacity: 0, rotation: -15 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".floating-element-1",
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".floating-element-2",
        { x: 200, y: -100, opacity: 0, rotation: 15 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".floating-element-2",
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Projects section animation
      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen ${getBackgroundClass()}`}>
      <Navbar />
      <FloatingThemeSelector
        currentTheme={themeState}
        onThemeChange={(theme) => handleThemeChange(theme as 0 | 1 | 2)}
      />

      <HeroSection
        y1={y1}
        y2={y2}
        y3={y3}
        x1={x1}
        x2={x2}
        opacity1={opacity1}
        opacity2={opacity2}
        opacity3={opacity3}
        scale1={scale1}
      />

      <HistorySection
        y1={y1}
        y2={y2}
        y3={y3}
        x1={x1}
        x2={x2}
        opacity1={opacity1}
        opacity2={opacity2}
        opacity3={opacity3}
        scale1={scale1}
      />

      <ProjectsSection />

      <CTASection
        y1={y1}
        y2={y2}
        y3={y3}
        x1={x1}
        x2={x2}
        opacity1={opacity1}
        opacity2={opacity2}
        opacity3={opacity3}
        scale1={scale1}
      />
    </div>
  );
}
