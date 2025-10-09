"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  themeState: number;
}

export default function ProjectCard({ project, themeState }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  const locale = params?.locale || "es";

  const getPrimaryColor = () => {
    switch (themeState) {
      case 0:
        return "text-gray-900";
      case 1:
        return "text-white";
      case 2:
        return "text-white";
      default:
        return "text-gray-900";
    }
  };

  const getSecondaryColor = () => {
    switch (themeState) {
      case 0:
        return "text-gray-700";
      case 1:
        return "text-gray-200";
      case 2:
        return "text-gray-300";
      default:
        return "text-gray-700";
    }
  };

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
        return "bg-wine-primary text-white hover:bg-wine-600";
      case 1:
        return "bg-wine-primary text-white hover:bg-wine-600";
      case 2:
        return "bg-white text-black hover:bg-gray-200";
      default:
        return "bg-wine-primary text-white hover:bg-wine-600";
    }
  };

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden border-2 backdrop-blur-sm ${getCardBackground()} shadow-2xl transition-all duration-300`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* Video Section - Vertical like mobile */}
        <div className="flex items-center justify-center">
          <motion.div
            className="relative w-60 h-[500px] rounded-4xl overflow-hidden shadow-2xl"
            animate={{
              scale: isHovered ? 1.05 : 1,
              rotateY: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow:
                themeState === 0
                  ? "0 0 40px rgba(var(--color-primary-wine), 0.3), 0 0 80px rgba(var(--color-primary-wine), 0.15)"
                  : themeState === 1
                  ? "0 0 50px rgba(0, 0, 0, 0.6), 0 0 100px rgba(0, 0, 0, 0.4)"
                  : "0 0 40px rgba(var(--color-primary-wine), 0.5), 0 0 80px rgba(var(--color-primary-wine), 0.25)",
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
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between">
          <div>
            <motion.h3
              className={`text-3xl font-bold mb-3 ${getPrimaryColor()}`}
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.name}
            </motion.h3>
            <p
              className={`text-lg font-semibold mb-4 ${getSecondaryColor()} opacity-80`}
            >
              {project.tagline}
            </p>
            <p
              className={`text-base leading-relaxed mb-6 ${getSecondaryColor()}`}
            >
              {project.shortDescription}
            </p>

            {/* Key Features - Dynamic based on project */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6 space-y-2">
                {project.features.slice(0, 3).map((feature, index) => (
                  <p
                    key={index}
                    className={`text-sm font-semibold ${getPrimaryColor()}`}
                  >
                    {["📸", "🎥", "💻", "🌍", "📱", "🔒", "✨"][index % 7]}{" "}
                    {feature.title}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="flex-1"
            >
              <motion.button
                className={`w-full px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 ${getButtonStyle()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Detalles Técnicos
              </motion.button>
            </Link>
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <motion.button
                  className={`w-full px-6 py-3 rounded-full text-base font-semibold border-2 transition-all duration-300 ${
                    themeState === 0
                      ? "border-wine-primary text-wine-primary hover:bg-wine-primary hover:text-white"
                      : themeState === 1
                      ? "border-wine-primary text-wine-primary hover:bg-wine-primary hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-black"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Proyecto
                </motion.button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
