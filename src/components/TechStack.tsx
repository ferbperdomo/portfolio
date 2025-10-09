"use client";

import { motion } from "framer-motion";
import type { Technology } from "../data/projects";

interface TechStackProps {
  technologies: Technology[];
  themeState: number;
}

export default function TechStack({
  technologies,
  themeState,
}: TechStackProps) {
  const getCategoryColor = (category: Technology["category"]) => {
    switch (category) {
      case "frontend":
        return themeState === 2
          ? "var(--color-info-light)"
          : "var(--color-info)";
      case "backend":
        return themeState === 2
          ? "var(--color-success-light)"
          : "var(--color-success)";
      case "database":
        return "var(--color-warning)";
      case "devops":
        return "var(--color-error-light)";
      case "tools":
        return themeState === 2
          ? "var(--color-mint-300)"
          : "var(--color-primary-mint)";
      default:
        return themeState === 2
          ? "var(--color-neutral-400)"
          : "var(--color-neutral-500)";
    }
  };

  const getCategoryLabel = (category: Technology["category"]) => {
    switch (category) {
      case "frontend":
        return "Frontend";
      case "backend":
        return "Backend";
      case "database":
        return "Database";
      case "devops":
        return "DevOps";
      case "tools":
        return "Tools";
      default:
        return "Other";
    }
  };

  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<Technology["category"], Technology[]>);

  const categories: Technology["category"][] = [
    "frontend",
    "backend",
    "database",
    "devops",
    "tools",
  ];

  return (
    <div className="space-y-6">
      {categories.map(
        (category) =>
          groupedTechnologies[category] && (
            <div key={category}>
              <h4
                className="text-sm font-semibold mb-3 uppercase tracking-wider"
                style={{ color: getCategoryColor(category) }}
              >
                {getCategoryLabel(category)}
              </h4>
              <div className="flex flex-wrap gap-3">
                {groupedTechnologies[category].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: `${getCategoryColor(category)}20`,
                      border: `2px solid ${getCategoryColor(category)}`,
                      color: getCategoryColor(category),
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
