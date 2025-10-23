import { MetadataRoute } from "next";
import { getAllProjects } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ferbperdomo.com";
  const projects = getAllProjects();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];

  const projectPages = projects.flatMap((project) => [
    {
      url: `${baseUrl}/es/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...projectPages];
}
