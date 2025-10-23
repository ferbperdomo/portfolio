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
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                  🌐 Ver Proyecto Live
                </motion.button>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className={`px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all duration-300 ${
                    themeState === 0
                      ? "border-primary-wine text-primary-wine hover:bg-primary-wine hover:text-white"
                      : themeState === 1
                      ? "border-primary-wine text-primary-wine hover:bg-primary-wine hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-black"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💻 Ver Código
                </motion.button>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
              🎯 El Desafío
            </h2>
            <p className={`text-lg leading-relaxed ${getSecondaryColor()}`}>
              {t(`projects.${project.slug}.fullDescription`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-8 text-center ${getPrimaryColor()}`}
            >
              🛠️ Stack Tecnológico
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🚀 Desafíos Técnicos Superados
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
                      ❌ Desafío:
                    </h4>
                    <p className={`${getSecondaryColor()}`}>
                      {challenge.problem}
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${getPrimaryColor()}`}
                    >
                      💡 Solución:
                    </h4>
                    <p className={`${getSecondaryColor()}`}>
                      {challenge.solution}
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${getPrimaryColor()}`}
                    >
                      ✅ Resultado:
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🔧 Funcionalidades Destacadas
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            📊 Resultados del Proyecto
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
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className={`text-3xl md:text-4xl font-bold mb-12 text-center ${getPrimaryColor()}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              💻 Código Destacado
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
      <section className="py-16 px-4 text-center">
        <motion.button
          onClick={() => router.back()}
          className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${getButtonStyle()}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Volver a Proyectos
        </motion.button>
      </section>
    </div>
  );
}
