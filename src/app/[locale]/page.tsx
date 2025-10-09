"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import FloatingThemeSelector from "../../components/FloatingThemeSelector";
import ProjectCard from "../../components/ProjectCard";
import { useTheme } from "../../contexts/ThemeContext";
import { getAllProjects } from "../../data/projects";
import Navbar from "./Navbar";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const t = useTranslations();
  const {
    themeState,
    handleThemeChange,
    getBackgroundClass,
    getPrimaryColor,
    getSecondaryColor,
  } = useTheme();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const projects = getAllProjects();

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

      // Code fragments animation
      gsap.fromTo(
        ".code-fragment",
        { x: -300, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".code-fragments",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Thread weaving animation
      gsap.fromTo(
        ".thread",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".threads-section",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text weaving animation
      gsap.fromTo(
        ".weaving-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".weaving-text",
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
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
          <div
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('/test.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
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

      {/* Historia Section */}
      <section
        className="relative py-32 px-6 md:px-4 overflow-hidden"
        style={{
          backgroundColor:
            themeState === 0
              ? "var(--color-accent-cream)"
              : themeState === 1
              ? "var(--color-mint-300)"
              : "var(--color-neutral-700)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-16 text-center ${getPrimaryColor()}`}
            style={{ opacity: opacity2 }}
          >
            {t("historia.title")}
          </motion.h2>

          {/* Floating Elements */}
          <div className="relative">
            <motion.div
              className="floating-element-1 absolute top-10 left-4 w-48 h-48 rounded-full opacity-20"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "#fef7ed"
                    : themeState === 1
                    ? "#bbf7d0"
                    : "#2a2a2a",
              }}
            />
            <motion.div
              className="floating-element-2 absolute top-20 right-4 w-32 h-32 rounded-full opacity-30"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "#fef7ed"
                    : themeState === 1
                    ? "#bbf7d0"
                    : "#2a2a2a",
              }}
            />

            <motion.div
              className="relative z-10 grid md:grid-cols-2 gap-16 items-center"
              style={{ y: y1 }}
            >
              <div>
                <motion.img
                  src="/test.png"
                  alt="Personal photo"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  style={{ scale: scale1 }}
                />
              </div>
              <motion.div
                className={`space-y-6 ${getSecondaryColor()}`}
                style={{ opacity: opacity1 }}
              >
                <p className="text-lg leading-relaxed">{t("historia.text1")}</p>
                <p className="text-lg leading-relaxed">{t("historia.text2")}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profesional Section */}
      <section
        className="relative py-32 px-6 md:px-4"
        style={{
          backgroundColor:
            themeState === 0
              ? "#fce7e7"
              : themeState === 1
              ? "#4fb38a"
              : "#2a2a2a",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-16 text-center ${getPrimaryColor()}`}
            style={{ opacity: opacity3 }}
          >
            {t("profesional.title")}
          </motion.h2>

          <div className="code-fragments grid md:grid-cols-3 gap-8">
            <motion.div
              className="code-fragment bg-black/10 backdrop-blur-sm rounded-2xl p-8"
              style={{ y: y2 }}
            >
              <div
                className="font-mono text-sm mb-4 whitespace-pre-line"
                style={{
                  color:
                    themeState === 0
                      ? "var(--color-primary-wine)"
                      : themeState === 1
                      ? "var(--color-primary-mint)"
                      : "var(--color-mint-300)",
                }}
              >
                {t("profesional.code1")}
              </div>
              <p className={`${getSecondaryColor()}`}>
                {t("profesional.desc1")}
              </p>
            </motion.div>

            <motion.div
              className="code-fragment bg-black/10 backdrop-blur-sm rounded-2xl p-8"
              style={{ y: y3 }}
            >
              <div
                className="font-mono text-sm mb-4 whitespace-pre-line"
                style={{
                  color:
                    themeState === 0
                      ? "var(--color-wine-700)"
                      : themeState === 1
                      ? "var(--color-mint-700)"
                      : "var(--color-mint-600)",
                }}
              >
                {t("profesional.code2")}
              </div>
              <p className={`${getSecondaryColor()}`}>
                {t("profesional.desc2")}
              </p>
            </motion.div>

            <motion.div
              className="code-fragment bg-black/10 backdrop-blur-sm rounded-2xl p-8"
              style={{ y: y1 }}
            >
              <div
                className="font-mono text-sm mb-4 whitespace-pre-line"
                style={{
                  color:
                    themeState === 0
                      ? "var(--color-wine-400)"
                      : themeState === 1
                      ? "var(--color-mint-800)"
                      : "var(--color-mint-900)",
                }}
              >
                {t("profesional.code3")}
              </div>
              <p className={`${getSecondaryColor()}`}>
                {t("profesional.desc3")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pasiones Section */}
      <section
        className="threads-section relative py-32 px-6 md:px-4"
        style={{
          backgroundColor:
            themeState === 0
              ? "var(--color-wine-200)"
              : themeState === 1
              ? "var(--color-primary-mint)"
              : "var(--color-neutral-900)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-16 text-center ${getPrimaryColor()}`}
            style={{ opacity: opacity1 }}
          >
            {t("pasiones.title")}
          </motion.h2>

          {/* Thread Weaving Animation */}
          <div className="relative h-96 mb-16">
            <motion.div
              className="thread absolute top-0 left-1/4 w-1 h-full origin-top"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "#fef7ed"
                    : themeState === 1
                    ? "#bbf7d0"
                    : "#2a2a2a",
              }}
            />
            <motion.div
              className="thread absolute top-0 left-1/2 w-1 h-full origin-top"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "#fef7ed"
                    : themeState === 1
                    ? "#bbf7d0"
                    : "#2a2a2a",
              }}
            />
            <motion.div
              className="thread absolute top-0 left-3/4 w-1 h-full origin-top"
              style={{
                backgroundColor:
                  themeState === 0
                    ? "#fef7ed"
                    : themeState === 1
                    ? "#bbf7d0"
                    : "#2a2a2a",
              }}
            />
          </div>

          {/* Weaving Text */}
          <div className="weaving-text space-y-8">
            <motion.p
              className={`text-xl leading-relaxed ${getSecondaryColor()}`}
              style={{ x: x1 }}
            >
              {t("pasiones.text1")}
            </motion.p>
            <motion.p
              className={`text-xl leading-relaxed ${getSecondaryColor()}`}
              style={{ x: x2 }}
            >
              {t("pasiones.text2")}
            </motion.p>
            <motion.p
              className={`text-xl leading-relaxed ${getSecondaryColor()}`}
              style={{ x: x1 }}
            >
              {t("pasiones.text3")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className="relative py-32 px-6 md:px-4"
        style={{
          backgroundColor:
            themeState === 0
              ? "var(--color-wine-100)"
              : themeState === 1
              ? "var(--color-mint-900)"
              : "var(--color-primary-black-light)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-16 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            💼 Proyectos Destacados
          </motion.h2>
          <div className="space-y-16">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                themeState={themeState}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-32 px-8 md:px-4 pb-40"
        style={{
          backgroundColor:
            themeState === 0
              ? "var(--color-wine-50)"
              : themeState === 1
              ? "var(--color-mint-50)"
              : "var(--color-primary-black-light)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-8 ${getPrimaryColor()}`}
            style={{ opacity: opacity2, scale: scale1 }}
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            className={`text-xl mb-12 ${getSecondaryColor()}`}
            style={{ opacity: opacity3 }}
          >
            {t("cta.subtitle")}
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center"
            style={{ opacity: opacity1 }}
          >
            <motion.button
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                themeState === 0
                  ? "bg-wine-primary text-white hover:bg-wine-600"
                  : themeState === 1
                  ? "bg-wine-primary text-white hover:bg-wine-600"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("cta.projects")}
            </motion.button>
            <motion.button
              className={`px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all duration-300 ${
                themeState === 0
                  ? "border-wine-primary text-wine-primary hover:bg-wine-primary hover:text-white"
                  : themeState === 1
                  ? "border-wine-primary text-wine-primary hover:bg-wine-primary hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("cta.contact")}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
