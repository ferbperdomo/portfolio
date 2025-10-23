"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";
import ProjectCard from "../ProjectCard";
import { getAllProjects } from "../../data/projects";

export default function ProjectsSection() {
  const t = useTranslations();
  const { themeState, getPrimaryColor } = useTheme();
  const projects = getAllProjects();

  return (
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("projects.title")}
        </motion.h2>

        <div className="projects-grid space-y-16">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard
                project={project}
                themeState={themeState}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
