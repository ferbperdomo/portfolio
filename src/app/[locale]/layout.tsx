import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import StructuredData from "../../components/StructuredData";
import { ThemeProvider } from "../../contexts/ThemeContext";
import "../globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ferbperdomo.com"),
  title: "Cristian Perdomo - Desarrollador Full Stack",
  description:
    "Portfolio de Cristian Perdomo - Desarrollador Full Stack especializado en Next.js, React, TypeScript y Node.js. Proyectos innovadores con diseño moderno y funcionalidad excepcional.",
  keywords: [
    "Cristian Perdomo",
    "Desarrollador Full Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Desarrollo Web",
    "JavaScript",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Cristian Perdomo" }],
  creator: "Cristian Perdomo",
  publisher: "Cristian Perdomo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: "https://ferbperdomo.com",
    siteName: "Cristian Perdomo - Portfolio",
    title: "Cristian Perdomo - Desarrollador Full Stack",
    description:
      "Portfolio de Cristian Perdomo - Desarrollador Full Stack especializado en Next.js, React, TypeScript y Node.js. Proyectos innovadores con diseño moderno y funcionalidad excepcional.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cristian Perdomo - Desarrollador Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Perdomo - Desarrollador Full Stack",
    description:
      "Portfolio de Cristian Perdomo - Desarrollador Full Stack especializado en Next.js, React, TypeScript y Node.js.",
    images: ["/og-image.png"],
    creator: "@ferbperdomo",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest",
  alternates: {
    canonical: "https://ferbperdomo.com",
  },
  other: {
    "theme-color": "#7c3a43",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["es", "en"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <StructuredData />
      </head>
      <body className={`${roboto.variable} font-roboto antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
