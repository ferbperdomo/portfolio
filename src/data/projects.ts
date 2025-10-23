export interface Project {
  id: string;
  slug: string;
  technologies: Technology[];
  videoUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  codeSnippets?: CodeSnippet[];
}

export interface Technology {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
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
  {
    id: "3",
    slug: "remitt",
    videoUrl: "/remitt.mp4",
    projectUrl: "https://remitt-comparison.vercel.app",
    githubUrl: "https://github.com/cristianperdomo/remitt-comparison",
    technologies: [
      { name: "React 17", category: "frontend" },
      { name: "JavaScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Express.js", category: "backend" },
      { name: "MongoDB", category: "database" },
      { name: "Axios", category: "backend" },
      { name: "Nodemailer", category: "backend" },
      { name: "OAuth2", category: "backend" },
      { name: "TransferWise API", category: "tools" },
      { name: "Context API", category: "frontend" },
    ],
    codeSnippets: [
      {
        title: "Integración de API Externa con Manejo de Errores",
        language: "javascript",
        code: `// Servicio de API para consultas de remesas
const axios = require('axios');

class RemittanceService {
  async getRates(fromCountry, toCountry, amount) {
    try {
      const response = await axios.get(\`\${API_BASE_URL}/rates\`, {
        params: { from: fromCountry, to: toCountry, amount }
      });
      
      return this.validateAndFormatRates(response.data);
    } catch (error) {
      console.error('API Error:', error.message);
      throw new Error('Error al obtener tasas de cambio');
    }
  }
  
  validateAndFormatRates(data) {
    return data.providers
      .filter(provider => provider.rate > 0)
      .sort((a, b) => a.totalCost - b.totalCost);
  }
}`,
        description:
          "Servicio robusto que maneja consultas a la API de TransferWise con validación de datos y manejo de errores elegante.",
      },
      {
        title: "Selector de Países con Banderas Base64",
        language: "javascript",
        code: `// Componente de selector de países con banderas
const CountrySelector = ({ countries, onSelect, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
        {filteredCountries.map(country => (
          <div
            key={country.code}
            onClick={() => onSelect(country)}
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
          >
            <img 
              src={\`data:image/png;base64,\${country.flag}\`}
              alt={country.name}
              className="w-6 h-4 mr-3"
            />
            <span>{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};`,
        description:
          "Componente interactivo con más de 100 países, banderas en base64 y búsqueda inteligente.",
      },
      {
        title: "Sistema de Temas con Context API",
        language: "javascript",
        code: `// Context para manejo de temas
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};`,
        description:
          "Sistema completo de temas con persistencia en localStorage y transiciones suaves.",
      },
    ],
  },
  {
    id: "4",
    slug: "irongame",
    videoUrl: "/irongame.mp4",
    projectUrl: "https://irongame.vercel.app",
    githubUrl: "https://github.com/cristianperdomo/irongame",
    technologies: [
      { name: "HTML5 Canvas", category: "frontend" },
      { name: "JavaScript Vanilla", category: "frontend" },
      { name: "CSS3", category: "frontend" },
      { name: "Canvas API", category: "frontend" },
      { name: "Web Audio API", category: "frontend" },
      { name: "Sprite Animation", category: "frontend" },
      { name: "Collision Detection", category: "frontend" },
      { name: "Game Loop", category: "frontend" },
      { name: "Vector Math", category: "frontend" },
      { name: "Trigonometry", category: "frontend" },
    ],
    codeSnippets: [
      {
        title: "Sistema de Colisiones con Cálculos Matemáticos",
        language: "javascript",
        code: `// Sistema de detección de colisiones
function checkCollision(obj1, obj2) {
  const dx = obj1.x - obj2.x;
  const dy = obj1.y - obj2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (obj1.radius + obj2.radius);
}

// Colisión específica para balas con enemigos
function checkBulletEnemyCollision(bullet, enemy) {
  if (checkCollision(bullet, enemy)) {
    enemy.health -= bullet.damage;
    bullet.destroy = true;
    return true;
  }
  return false;
}

// Colisión jugador con bonificaciones
function checkPlayerBonusCollision(player, bonus) {
  if (checkCollision(player, bonus)) {
    player.health = Math.min(100, player.health + bonus.healAmount);
    bonus.destroy = true;
    return true;
  }
  return false;
}`,
        description:
          "Sistema robusto de detección de colisiones que maneja 4 tipos diferentes de interacciones entre elementos del juego usando cálculos matemáticos precisos.",
      },
      {
        title: "Sistema de Movimiento de Enemigos con Vectores",
        language: "javascript",
        code: `// Movimiento de enemigos hacia el jugador
class Enemy {
  constructor(x, y, speed, type) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.type = type;
  }
  
  update(player) {
    // Calcular dirección hacia el jugador
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalizar vector y aplicar velocidad
    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }
}

// Crear enemigos con diferentes velocidades
const pythonEnemy = new Enemy(x, y, 1, 'python');
const octoEnemy = new Enemy(x, y, 2.5, 'octopus');`,
        description:
          "Sistema de movimiento direccional que hace que los enemigos persigan al jugador usando vectores normalizados y velocidades diferenciadas.",
      },
      {
        title: "Sistema de Disparo Direccional con Trigonometría",
        language: "javascript",
        code: `// Sistema de disparo direccional
class Bullet {
  constructor(x, y, targetX, targetY, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    
    // Calcular ángulo hacia el objetivo
    const dx = targetX - x;
    const dy = targetY - y;
    this.angle = Math.atan2(dy, dx);
  }
  
  update() {
    // Mover bala usando trigonometría
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }
}

// Manejar clic del mouse para disparar
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const targetX = e.clientX - rect.left;
  const targetY = e.clientY - rect.top;
  
  const bullet = new Bullet(player.x, player.y, targetX, targetY, 5);
  bullets.push(bullet);
});`,
        description:
          "Sistema de disparo que calcula automáticamente la dirección y trayectoria de las balas usando trigonometría (atan2, cos, sin) basado en la posición del clic del mouse.",
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
