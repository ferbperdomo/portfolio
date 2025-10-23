#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Crear directorio para imágenes OG si no existe
const ogDir = path.join(__dirname, "../public/og-images");
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}

// Crear imagen OG principal
const mainOgImage = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c3a43;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Content -->
  <text x="100" y="200" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white">
    Cristian Perdomo
  </text>
  <text x="100" y="280" font-family="Arial, sans-serif" font-size="36" fill="#f9d4af">
    Desarrollador Full Stack
  </text>
  <text x="100" y="350" font-family="Arial, sans-serif" font-size="24" fill="#d88a8a">
    Next.js • React • TypeScript • Node.js
  </text>
  
  <!-- Decorative elements -->
  <circle cx="1000" cy="150" r="80" fill="#7c3a43" opacity="0.3"/>
  <circle cx="1100" cy="400" r="60" fill="#f9d4af" opacity="0.2"/>
  <rect x="900" y="500" width="200" height="100" fill="#58c29e" opacity="0.1" rx="10"/>
</svg>
`;

fs.writeFileSync(path.join(ogDir, "main-og.svg"), mainOgImage);

console.log("✅ Imagen OG principal generada");
console.log("📁 Ubicación: /public/og-images/main-og.svg");
console.log(
  "💡 Convierte a PNG con: npx svg2png-cli public/og-images/main-og.svg -o public/og-image.png"
);
