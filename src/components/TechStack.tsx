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
        if (themeState === 0) {
          return "var(--color-wine-600)"; // Wine theme: darker wine
        } else if (themeState === 1) {
          return "var(--color-wine-600)"; // Mint theme: use wine for contrast
        } else {
          return "var(--color-wine-400)"; // Dark theme: medium wine for balanced contrast
        }
      case "backend":
        if (themeState === 0) {
          return "var(--color-cream-600)"; // Wine theme: cream
        } else if (themeState === 1) {
          return "var(--color-cream-500)"; // Mint theme: cream for contrast
        } else {
          return "var(--color-wine-200)"; // Dark theme: medium cream for balanced contrast
        }
      case "database":
        if (themeState === 0) {
          return "var(--color-wine-700)"; // Wine theme: darker wine
        } else if (themeState === 1) {
          return "var(--color-wine-700)"; // Mint theme: wine for contrast
        } else {
          return "var(--color-wine-400)"; // Dark theme: medium wine for balanced contrast
        }
      case "devops":
        if (themeState === 0) {
          return "var(--color-cream-700)"; // Wine theme: darker cream
        } else if (themeState === 1) {
          return "var(--color-cream-600)"; // Mint theme: cream for contrast
        } else {
          return "var(--color-wine-500)"; // Dark theme: medium cream for balanced contrast
        }
      case "tools":
        if (themeState === 0) {
          return "var(--color-wine-500)"; // Wine theme: medium wine
        } else if (themeState === 1) {
          return "var(--color-wine-500)"; // Mint theme: wine for contrast
        } else {
          return "var(--color-wine-300)"; // Dark theme: lighter wine for balanced contrast
        }
      default:
        if (themeState === 0) {
          return "var(--color-wine-400)"; // Wine theme: lighter wine
        } else if (themeState === 1) {
          return "var(--color-wine-400)"; // Mint theme: wine for contrast
        } else {
          return "var(--color-wine-400)"; // Dark theme: medium cream for balanced contrast
        }
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
