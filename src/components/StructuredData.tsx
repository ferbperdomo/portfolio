export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cristian Perdomo",
    jobTitle: "Desarrollador Full Stack",
    description: "Doy vida a tus ideas con código que se ve tan bien como funciona.",
    url: "https://ferbperdomo.com",
    sameAs: [
      "https://github.com/cristianperdomo",
      "https://linkedin.com/in/cristianperdomo",
      "https://twitter.com/cristianperdomo",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "Web Development",
      "Full Stack Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Desarrollador Full Stack",
      description:
        "Desarrollo de aplicaciones web completas con tecnologías modernas",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Autodidacta en Desarrollo Web",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
