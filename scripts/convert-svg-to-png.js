#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Leer el archivo SVG
const svgPath = path.join(__dirname, "../public/og-images/main-og.svg");
const pngPath = path.join(__dirname, "../public/og-image.png");

if (!fs.existsSync(svgPath)) {
  console.log("❌ No se encontró el archivo SVG");
  process.exit(1);
}

// Leer el contenido SVG
const svgContent = fs.readFileSync(svgPath, "utf8");

// Crear un HTML temporal para renderizar el SVG
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; }
    svg { width: 1200px; height: 630px; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>
`;

// Escribir el HTML temporal
const tempHtmlPath = path.join(__dirname, "../public/temp-og.html");
fs.writeFileSync(tempHtmlPath, htmlContent);

console.log("✅ Archivo HTML temporal creado");
console.log("📁 Ubicación: /public/temp-og.html");
console.log("💡 Para convertir a PNG, puedes usar:");
console.log("   - Chrome headless: google-chrome --headless --screenshot=og-image.png --window-size=1200,630 temp-og.html");
console.log("   - O usar una herramienta online como https://htmlcsstoimage.com/");
console.log("   - O usar Puppeteer para automatizar la conversión");

// También copiar el SVG a la ubicación principal
fs.copyFileSync(svgPath, pngPath.replace('.png', '.svg'));
console.log("📋 SVG copiado a /public/og-image.svg");
