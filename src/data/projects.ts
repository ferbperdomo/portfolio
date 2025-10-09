export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  technologies: Technology[];
  videoUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  challenges: Challenge[];
  features: Feature[];
  metrics: Metric[];
  codeSnippets?: CodeSnippet[];
}

export interface Technology {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
  icon?: string;
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Metric {
  label: string;
  value: string;
  icon?: string;
}

export interface CodeSnippet {
  title: string;
  code: string;
  language: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "beyourmotorbike",
    name: "BeYourMotorbike",
    tagline: "Plataforma de Alquiler de Motos en Tenerife",
    shortDescription:
      "Plataforma web completa que conecta propietarios de motos con turistas para alquileres seguros y rentables. Los usuarios pueden alquilar motos premium con reservas online, mientras que los propietarios ganan dinero con sus vehículos sin complicaciones.",
    fullDescription:
      "Desarrollé una plataforma completa de alquiler de motocicletas desde cero utilizando Next.js 15 con TypeScript, PostgreSQL y Prisma ORM. El proyecto incluye un sistema de autenticación robusto con NextAuth.js, procesamiento de pagos con Stripe (incluyendo depósitos, comisiones automáticas y reembolsos), y un panel administrativo completo para gestión de usuarios, reservas y analytics.",
    videoUrl: "/beyourmotorbike.mp4",
    projectUrl: "https://beyourmotorbike.com",
    technologies: [
      { name: "Next.js 15", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Leaflet", category: "frontend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Prisma ORM", category: "backend" },
      { name: "NextAuth.js", category: "backend" },
      { name: "Stripe", category: "backend" },
      { name: "Cloudinary", category: "tools" },
      { name: "Zod", category: "backend" },
      { name: "next-intl", category: "tools" },
    ],
    challenges: [
      {
        title: "Diseño de Base de Datos desde Cero",
        problem:
          "Primera vez diseñando un esquema relacional completo para un marketplace con múltiples entidades interconectadas.",
        solution:
          "Creé 8+ tablas interconectadas con relaciones complejas entre usuarios, motos, reservas y pagos. Implementé roles granulares (CLIENT, PROVIDER, ADMIN) y un sistema de documentos escalable.",
        result:
          "Sistema escalable que maneja eficientemente todas las operaciones del marketplace con integridad referencial completa.",
      },
      {
        title: "Sistema de Pagos Complejo",
        problem:
          "Integrar Stripe con cálculos automáticos de comisiones, depósitos, descuentos y reembolsos.",
        solution:
          "Implementé webhooks para procesar pagos en tiempo real, calcular comisiones automáticas (40/60), manejar depósitos del 15% inicial y un sistema de reembolsos con tracking completo.",
        result:
          "Sistema automático de pagos que procesa transacciones de forma segura con cálculos financieros precisos.",
      },
      {
        title: "Internacionalización Empresarial",
        problem:
          "Crear una plataforma multiidioma con SEO optimizado para tres mercados diferentes.",
        solution:
          "Implementé next-intl con soporte completo para ES/EN/DE, configuré hreflang para SEO, y creé middleware inteligente para redirección automática según el idioma del navegador.",
        result:
          "Plataforma completamente internacionalizada con SEO optimizado para tres idiomas y UX fluida.",
      },
    ],
    features: [
      {
        title: "Sistema de Documentos Avanzado",
        description:
          "Permite escanear documentos con la cámara del móvil, recortarlos con CropperJS y subirlos organizadamente a Cloudinary. Incluye validación de ITV, seguros y licencias con tokens de acceso para visualización segura.",
      },
      {
        title: "Panel Administrativo Completo",
        description:
          "Panel con gestión de usuarios, motos, reservas y analytics en tiempo real. Incluye sistema de marketing con exportación de datos y gestión de reembolsos con estados.",
      },
      {
        title: "Procesamiento de Pagos Automático",
        description:
          "Integración completa con Stripe que maneja depósitos (15% inicial), cálculo automático de comisiones (40/60), códigos de descuento y reembolsos con tracking completo.",
      },
      {
        title: "Sistema de Reservas Inteligente",
        description:
          "Calendarios dinámicos con disponibilidad en tiempo real, cálculo automático de precios según duración, aplicación de descuentos y gestión de extras (cascos, chaquetas, etc.).",
      },
    ],
    metrics: [
      {
        label: "Tiempo de Desarrollo",
        value: "2 meses",
      },
      {
        label: "Tablas de Base de Datos",
        value: "8+",
      },
      {
        label: "Idiomas Implementados",
        value: "3",
      },
      {
        label: "Endpoints de API",
        value: "15+",
      },
      {
        label: "Type Safety",
        value: "100%",
      },
      {
        label: "Secciones del Panel Admin",
        value: "6",
      },
    ],
    codeSnippets: [
      {
        title: "JWT con Renovación Automática y Validación de Usuario",
        language: "typescript",
        code: `// JWT con renovación automática y validación de usuario
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = user.role;
    token.iat = Math.floor(Date.now() / 1000);
    token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
  }

  // Verificar que el usuario existe en la base de datos
  if (token.id) {
    try {
      const userExists = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { id: true, role: true },
      });

      if (!userExists) {
        return { ...token, error: "UserNotFound" };
      }

      token.role = userExists.role;
    } catch (error) {
      console.error("Error verifying user existence:", error);
      return { ...token, error: "UserVerificationFailed" };
    }
  }

  // Renovar el token si está próximo a expirar (2 horas antes)
  if (
    token.exp &&
    typeof token.exp === "number" &&
    token.exp < Math.floor(Date.now() / 1000) + 2 * 60 * 60
  ) {
    token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
  }

  return token;
}`,
        description:
          "Sistema JWT avanzado con verificación automática de usuarios en base de datos y renovación proactiva de tokens para mantener sesiones seguras.",
      },
      {
        title: "Sistema de Documentos con Validación",
        language: "typescript",
        code: `// Sistema de documentos con validación
const documentSchema = z.object({
  documentType: z.enum(['id', 'license', 'itv', 'insurance']),
  side: z.enum(['front', 'back']),
  file: z.instanceof(File),
  expiryDate: z.date().optional()
});`,
        description:
          "Validación robusta de documentos con Zod para garantizar la integridad de los datos antes de la subida.",
      },
    ],
  },
  {
    id: "2",
    slug: "byte-studio",
    name: "BYTE STUDIO",
    tagline: "Estudio Creativo de Contenido Visual y Desarrollo Web",
    shortDescription:
      "Plataforma digital que muestra nuestro trabajo en fotografía, videografía y desarrollo web. Los clientes pueden explorar nuestro portafolio visual, ver proyectos reales y contactarnos directamente para crear contenido que haga brillar su marca.",
    fullDescription:
      "Desarrollé una plataforma de portfolio completa desde cero utilizando Next.js 15 (App Router) con TypeScript, implementando un sistema de gestión de medios basado en file system sin necesidad de base de datos. El proyecto incluye galerías interactivas con lazy loading, un sistema de internacionalización completo con next-intl (ES/EN), y un diseño full responsive con animaciones avanzadas usando Framer Motion.",
    videoUrl: "/bytestudio.mp4",
    projectUrl: "https://bytestudio.com",
    technologies: [
      { name: "Next.js 15 (App Router)", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS v4", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Headless UI", category: "frontend" },
      { name: "Heroicons", category: "frontend" },
      { name: "Lucide React", category: "frontend" },
      { name: "next-intl", category: "tools" },
      { name: "Resend", category: "backend" },
      { name: "Sharp", category: "tools" },
      { name: "File System API", category: "backend" },
      { name: "Server Components", category: "backend" },
    ],
    challenges: [
      {
        title: "Sistema de Gestión de Medios sin Base de Datos",
        problem:
          "Crear un sistema que gestione más de 48 archivos multimedia (24 imágenes + 24 videos) sin base de datos, pero con metadata dinámica y búsqueda eficiente.",
        solution:
          "Implementé un sistema basado en File System API que escanea automáticamente directorios (/public/media/), genera metadata dinámica, y utiliza Server Components para el rendering inicial con cero overhead de database queries.",
        result:
          "Sistema de medios ultrarrápido que carga metadata en build-time, con lazy loading progresivo y optimización automática de imágenes con Sharp.",
      },
      {
        title: "Galerías Interactivas con Rendimiento Óptimo",
        problem:
          "Crear galerías con 24+ elementos multimedia cada una, manteniendo rendimiento óptimo y experiencia de usuario fluida.",
        solution:
          "Implementé lazy loading con Intersection Observer, infinite scroll, modales fullscreen con navegación por teclado, y optimización de imágenes con Next/Image y Sharp.",
        result:
          "Galerías que cargan instantáneamente con scroll infinito, consumo mínimo de memoria y Core Web Vitals optimizados.",
      },
      {
        title: "Componentes UI Interactivos en Tiempo Real",
        problem:
          "Mostrar componentes UI avanzados con efectos modernos (glassmorphism, morphing, 3D) que funcionen perfectamente en todos los dispositivos.",
        solution:
          "Creé un sistema de componentes modulares con Framer Motion, efectos de parallax, animaciones en cascade (stagger), y transiciones suaves optimizadas para mobile-first.",
        result:
          "Experiencia visual impresionante con animaciones fluidas y efectos premium que funcionan perfectamente en cualquier dispositivo.",
      },
    ],
    features: [
      {
        title: "Sistema de Medios Local Automatizado",
        description:
          "File System API escanea automáticamente directorios, genera thumbnails con Sharp, y crea metadata dinámica sin base de datos. Optimización automática de imágenes y videos con caching estratégico.",
      },
      {
        title: "Galerías Interactivas Avanzadas",
        description:
          "Lazy loading con Intersection Observer, infinite scroll, modales fullscreen con navegación por teclado (←/→), y efectos de zoom. Soporte para imágenes y videos con reproducción inmersiva.",
      },
      {
        title: "Sistema de Contacto Inteligente",
        description:
          "Integración con Resend para envío de emails con templates HTML personalizados, validación en tiempo real, rate limiting en API Routes, y confirmación automática.",
      },
      {
        title: "Componentes UI Showcase",
        description:
          "WebGallery con componentes interactivos en tiempo real: botones con morphing, cards con glassmorphism, inputs con gradientes animados, iconos con transformaciones 3D, y efectos de parallax.",
      },
      {
        title: "Efectos Visuales Premium",
        description:
          "InteractiveFirmament con partículas animadas, hero section con glassmorphism y sweeping light, transiciones de página suaves, y animaciones en cascade con Framer Motion.",
      },
      {
        title: "Optimización de Rendimiento Total",
        description:
          "Server Components por defecto, lazy loading estratégico, caching inteligente, scripts de optimización automatizados, y SEO completo con metadata dinámica, robots.ts, sitemap.ts y hreflang.",
      },
    ],
    metrics: [
      {
        label: "Archivos Multimedia",
        value: "48+",
      },
      {
        label: "Idiomas Implementados",
        value: "2",
      },
      {
        label: "Componentes UI",
        value: "20+",
      },
      {
        label: "Sin Base de Datos",
        value: "100%",
      },
      {
        label: "Mobile-First",
        value: "✓",
      },
      {
        label: "Optimización SEO",
        value: "Total",
      },
    ],
    codeSnippets: [
      {
        title: "Sistema de Medios con File System",
        language: "typescript",
        code: `// Escaneo automático de medios desde file system
const mediaFiles = await fs.readdir(path.join(process.cwd(), 'public/media'));
const mediaData = await Promise.all(
  mediaFiles.map(async (file) => {
    const stats = await fs.stat(path.join('public/media', file));
    return {
      filename: file,
      size: stats.size,
      modified: stats.mtime,
      type: file.endsWith('.mp4') ? 'video' : 'image'
    };
  })
);`,
        description:
          "Sistema que genera metadata dinámica de medios sin base de datos, utilizando File System API.",
      },
      {
        title: "Lazy Loading con Intersection Observer",
        language: "typescript",
        code: `// Lazy loading optimizado con Framer Motion
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true
});

return (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
  >
    {inView && <MediaGallery items={media} />}
  </motion.div>
);`,
        description:
          "Implementación de lazy loading que carga contenido solo cuando entra en viewport, optimizando rendimiento.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
