"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import FloatingThemeSelector from "../../../../components/FloatingThemeSelector";
import TechStack from "../../../../components/TechStack";
import { useTheme } from "../../../../contexts/ThemeContext";
import { getProjectBySlug } from "../../../../data/projects";
import type {
  Challenge,
  Feature,
  Metric,
} from "../../../../types/translations";
import Navbar from "../../Navbar";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();

  // Typed wrapper for accessing nested translation objects
  const getRawTranslations = (key: string) =>
    (t as unknown as { raw: (key: string) => unknown }).raw(key);
  const {
    themeState,
    handleThemeChange,
    getBackgroundClass,
    getPrimaryColor,
    getSecondaryColor,
  } = useTheme();

  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className={`min-h-screen ${getBackgroundClass()}`}>
        <Navbar />
        <div className="pt-32 px-4 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${getPrimaryColor()}`}>
            Proyecto no encontrado
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-full bg-primary-wine text-white hover:bg-wine-600 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const getCardBackground = () => {
    switch (themeState) {
      case 0:
        return "bg-white/80 border-gray-200/50";
      case 1:
        return "bg-white/10 border-white/20";
      case 2:
        return "bg-white/5 border-white/10";
      default:
        return "bg-white/80 border-gray-200/50";
    }
  };

  const getButtonStyle = () => {
    switch (themeState) {
      case 0:
        return "bg-primary-wine text-white hover:bg-wine-600";
      case 1:
        return "bg-primary-wine text-white hover:bg-wine-600";
      case 2:
        return "bg-white text-black hover:bg-gray-200";
      default:
        return "bg-primary-wine text-white hover:bg-wine-600";
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <Navbar />
      <FloatingThemeSelector
        currentTheme={themeState}
        onThemeChange={(theme) => handleThemeChange(theme as 0 | 1 | 2)}
      />

      {/* Hero Section with Video */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        {/* Dynamic background for hero */}
        <div className="absolute inset-0 z-0">
          <div
            className={`w-full h-full opacity-20 ${
              themeState === 0
                ? "bg-gradient-to-br from-wine-100 via-wine-200 to-wine-300"
                : themeState === 1
                ? "bg-gradient-to-br from-mint-800 via-mint-700 to-mint-900"
                : "bg-gradient-to-br from-primary-black via-gray-800 to-primary-black"
            }`}
          />
          {/* Animated geometric pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 0L60 30L30 60L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Floating elements */}
          <motion.div
            className={`absolute top-20 right-20 w-32 h-32 rounded-full opacity-15 ${
              themeState === 0
                ? "bg-wine-300"
                : themeState === 1
                ? "bg-mint-600"
                : "bg-gray-600"
            }`}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className={`absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-20 ${
              themeState === 0
                ? "bg-wine-400"
                : themeState === 1
                ? "bg-mint-700"
                : "bg-gray-700"
            }`}
            animate={{
              y: [0, 15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`text-5xl md:text-7xl font-bold mb-4 ${getPrimaryColor()}`}
            >
              {t(`projects.${project.slug}.name`)}
            </h1>
            <p className={`text-xl md:text-2xl ${getSecondaryColor()}`}>
              {t(`projects.${project.slug}.tagline`)}
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className={`relative rounded-4xl overflow-hidden shadow-2xl ${
                project.slug === "irongame"
                  ? "w-80 h-40 md:w-[500px] md:h-60" // Same responsive dimensions as home
                  : "w-60 h-[500px]" // Vertical for other projects
              }`}
              style={{
                boxShadow:
                  themeState === 0
                    ? "0 0 50px rgba(var(--color-primary-wine), 0.4), 0 0 100px rgba(var(--color-primary-wine), 0.2)"
                    : themeState === 1
                    ? "0 0 60px rgba(0, 0, 0, 0.7), 0 0 120px rgba(0, 0, 0, 0.5)"
                    : "0 0 50px rgba(var(--color-primary-wine), 0.6), 0 0 100px rgba(var(--color-primary-wine), 0.3)",
              }}
            >
              <video
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${getButtonStyle()}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Proyecto Live
                </motion.button>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Full Description */}
      <section
        className={`py-16 px-4 relative ${
          themeState === 0
            ? "bg-gradient-to-r from-wine-50 to-cream-50"
            : themeState === 1
            ? "bg-gradient-to-r from-mint-900 to-mint-800"
            : "bg-gradient-to-r from-primary-black to-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className={`rounded-3xl p-8 md:p-12 border-2 backdrop-blur-sm ${getCardBackground()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${getPrimaryColor()}`}
            >
              El Desafío
            </h2>
            <p className={`text-lg leading-relaxed ${getSecondaryColor()}`}>
              {t(`projects.${project.slug}.fullDescription`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section
        className={`py-16 px-4 relative ${
          themeState === 0
            ? "bg-gradient-to-br from-wine-100 via-wine-200 to-wine-300"
            : themeState === 1
            ? "bg-gradient-to-br from-mint-800 via-mint-700 to-mint-900"
            : "bg-gradient-to-br from-gray-900 via-primary-black to-gray-800"
        }`}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-8 text-center ${getPrimaryColor()}`}
            >
              Stack Tecnológico
            </h2>
            <div
              className={`rounded-3xl p-8 md:p-12 border-2 backdrop-blur-sm ${getCardBackground()}`}
            >
              <TechStack
                technologies={project.technologies}
                themeState={themeState}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenges */}
      <section
        className={`py-16 px-4 relative ${
          themeState === 0
            ? "bg-gradient-to-l from-wine-200 via-wine-300 to-wine-400"
            : themeState === 1
            ? "bg-gradient-to-l from-mint-700 via-mint-800 to-mint-900"
            : "bg-gradient-to-l from-primary-black via-gray-800 to-gray-900"
        }`}
      >
        {/* Animated floating elements */}
        <motion.div
          className={`absolute top-10 right-10 w-20 h-20 rounded-full opacity-10 ${
            themeState === 0
              ? "bg-wine-400"
              : themeState === 1
              ? "bg-mint-600"
              : "bg-gray-600"
          }`}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bottom-10 left-10 w-16 h-16 rounded-full opacity-15 ${
            themeState === 0
              ? "bg-wine-500"
              : themeState === 1
              ? "bg-mint-700"
              : "bg-gray-700"
          }`}
          animate={{
            y: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Desafíos Técnicos Superados
          </motion.h2>
          <div className="space-y-8">
            {Object.entries(
              getRawTranslations(
                `projects.${project.slug}.challenges`
              ) as Record<string, Challenge>
            ).map(([key, challenge], index) => (
              <motion.div
                key={key}
                className={`rounded-3xl p-8 border-2 backdrop-blur-sm ${getCardBackground()}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className={`text-2xl font-bold mb-4 ${getPrimaryColor()}`}>
                  {challenge.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${getPrimaryColor()}`}
                    >
                      Desafío:
                    </h4>
                    <p className={`${getSecondaryColor()}`}>
                      {challenge.problem}
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${getPrimaryColor()}`}
                    >
                      Solución:
                    </h4>
                    <p className={`${getSecondaryColor()}`}>
                      {challenge.solution}
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${getPrimaryColor()}`}
                    >
                      Resultado:
                    </h4>
                    <p className={`${getSecondaryColor()}`}>
                      {challenge.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className={`py-16 px-4 relative ${
          themeState === 0
            ? "bg-gradient-to-tr from-wine-300 via-wine-400 to-wine-500"
            : themeState === 1
            ? "bg-gradient-to-tr from-mint-600 via-mint-700 to-mint-800"
            : "bg-gradient-to-tr from-gray-800 via-primary-black to-gray-700"
        }`}
      >
        {/* Diagonal pattern overlay */}
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Funcionalidades Destacadas
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(
              getRawTranslations(`projects.${project.slug}.features`) as Record<
                string,
                Feature
              >
            ).map(([key, feature], index) => (
              <motion.div
                key={key}
                className={`rounded-3xl p-8 border-2 backdrop-blur-sm ${getCardBackground()}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className={`text-xl font-bold mb-3 ${getPrimaryColor()}`}>
                  {feature.title}
                </h3>
                <p className={`${getSecondaryColor()}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section
        className={`py-16 px-4 relative ${
          themeState === 0
            ? "bg-gradient-to-bl from-wine-400 via-wine-500 to-wine-600"
            : themeState === 1
            ? "bg-gradient-to-bl from-mint-700 via-mint-800 to-mint-900"
            : "bg-gradient-to-bl from-primary-black via-gray-900 to-black"
        }`}
      >
        {/* Radial pattern overlay */}
        <div
          className="absolute inset-0 opacity-6"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Resultados del Proyecto
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(
              getRawTranslations(`projects.${project.slug}.metrics`) as Record<
                string,
                Metric
              >
            ).map(([key, metric], index) => (
              <motion.div
                key={key}
                className={`rounded-3xl p-6 border-2 backdrop-blur-sm text-center ${getCardBackground()}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`text-3xl font-bold mb-2 ${getPrimaryColor()}`}>
                  {metric.value}
                </div>
                <div className={`text-sm ${getSecondaryColor()}`}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Snippets */}
      {project.codeSnippets && project.codeSnippets.length > 0 && (
        <section
          className={`py-16 px-4 relative ${
            themeState === 0
              ? "bg-gradient-to-tl from-wine-500 via-wine-600 to-wine-700"
              : themeState === 1
              ? "bg-gradient-to-tl from-mint-800 via-mint-900 to-black"
              : "bg-gradient-to-tl from-gray-900 via-black to-primary-black"
          }`}
        >
          {/* Code-inspired pattern */}
          <div
            className="absolute inset-0 opacity-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='1' height='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h2
              className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Código Destacado
            </motion.h2>
            <div className="space-y-8">
              {project.codeSnippets.map((snippet, index) => (
                <motion.div
                  key={index}
                  className={`rounded-3xl p-8 border-2 backdrop-blur-sm ${getCardBackground()}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className={`text-xl font-bold mb-3 ${getPrimaryColor()}`}>
                    {snippet.title}
                  </h3>
                  {snippet.description && (
                    <p className={`mb-4 ${getSecondaryColor()}`}>
                      {snippet.description}
                    </p>
                  )}
                  <pre
                    className={`p-6 rounded-2xl overflow-x-auto ${
                      themeState === 2 ? "bg-black/50" : "bg-black/80"
                    }`}
                  >
                    <code className="text-green-400 text-sm font-mono">
                      {snippet.code}
                    </code>
                  </pre>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Button */}
      <section
        className={`py-16 px-4 text-center relative ${
          themeState === 0
            ? "bg-gradient-to-b from-wine-600 to-wine-700"
            : themeState === 1
            ? "bg-gradient-to-b from-black to-mint-900"
            : "bg-gradient-to-b from-primary-black to-black"
        }`}
      >
        {/* Final decorative elements */}
        <motion.div
          className={`absolute top-1/2 left-1/4 w-12 h-12 rounded-full opacity-20 ${
            themeState === 0
              ? "bg-wine-300"
              : themeState === 1
              ? "bg-mint-600"
              : "bg-gray-600"
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className={`absolute top-1/2 right-1/4 w-8 h-8 rounded-full opacity-25 ${
            themeState === 0
              ? "bg-wine-400"
              : themeState === 1
              ? "bg-mint-700"
              : "bg-gray-700"
          }`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.button
          onClick={() => router.back()}
          className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${getButtonStyle()}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver a Proyectos
        </motion.button>
      </section>
    </div>
  );
}
