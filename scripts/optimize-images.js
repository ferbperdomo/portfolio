#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const outputDir = path.join(publicDir, "optimized");

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuración de optimización
const imageConfigs = [
  {
    format: "webp",
    quality: 80,
    suffix: ".webp",
  },
  {
    format: "avif",
    quality: 70,
    suffix: ".avif",
  },
];

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputPath, config) {
  try {
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat(config.format, { quality: config.quality })
      .toFile(outputPath);

    console.log(
      `✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(
        outputPath
      )}`
    );
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Función principal
async function main() {
  console.log("🚀 Starting image optimization...");

  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter((file) => /\.(png|jpg|jpeg)$/i.test(file));

  console.log(`📁 Found ${imageFiles.length} images to optimize`);

  for (const file of imageFiles) {
    const inputPath = path.join(publicDir, file);
    const baseName = path.parse(file).name;

    for (const config of imageConfigs) {
      const outputPath = path.join(outputDir, `${baseName}${config.suffix}`);
      await optimizeImage(inputPath, outputPath, config);
    }
  }

  console.log("✨ Image optimization complete!");
}

main().catch(console.error);
