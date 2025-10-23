import type { Metadata } from "next";
import { getProjectBySlug } from "../../../../data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto solicitado no fue encontrado.",
    };
  }

  const projectName = project.name;
  const projectDescription = project.shortDescription;

  return {
    title: `${projectName} - Cristian Perdomo`,
    description: projectDescription,
    keywords: [
      projectName,
      "Cristian Perdomo",
      "Proyecto",
      "Desarrollo Web",
      "Portfolio",
      ...project.technologies.map((tech) => tech.name),
    ],
    openGraph: {
      title: `${projectName} - Cristian Perdomo`,
      description: projectDescription,
      type: "website",
      url: `https://ferbperdomo.com/${locale}/projects/${slug}`,
      images: [
        {
          url: `/projects/${slug}-og.png`,
          width: 1200,
          height: 630,
          alt: `${projectName} - Proyecto de Cristian Perdomo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectName} - Cristian Perdomo`,
      description: projectDescription,
      images: [`/projects/${slug}-og.png`],
    },
  };
}
