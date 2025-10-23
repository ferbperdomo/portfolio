import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    name: "Cristian Perdomo - Portfolio",
    short_name: "Cristian Perdomo",
    description: "Portfolio de Cristian Perdomo - Desarrollador Full Stack",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3a43",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
    categories: ["portfolio", "developer", "web"],
    lang: "es",
    dir: "ltr",
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
