# 🚀 Configuración SEO y Open Graph

## ✅ Implementado

### Meta Tags Completos

- **Title y Description** optimizados
- **Keywords** relevantes
- **Open Graph** para redes sociales
- **Twitter Cards** para Twitter
- **Structured Data** (JSON-LD) para Google
- **Robots.txt** y **Sitemap.xml**

### Archivos Creados

- `src/app/sitemap.ts` - Sitemap automático
- `src/app/robots.ts` - Robots.txt
- `src/components/StructuredData.tsx` - Datos estructurados
- `public/manifest.json` - PWA manifest
- `scripts/generate-og-images.js` - Generador de imágenes OG

## 🎨 Imágenes Open Graph

### Generar Imagen Principal

```bash
# 1. Ejecutar el script
node scripts/generate-og-images.js

# 2. Convertir SVG a PNG (requiere svg2png-cli)
npm install -g svg2png-cli
svg2png-cli public/og-images/main-og.svg -o public/og-image.png
```

### Dimensiones Recomendadas

- **Principal**: 1200x630px (og-image.png)
- **Proyectos**: 1200x630px (projects/[slug]-og.png)

## 🔧 Configuración Adicional

### Variables de Entorno

```env
NEXT_PUBLIC_SITE_URL=https://ferbperdomo.com
```

### Verificación SEO

- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/)

## 📊 Métricas SEO

### Core Web Vitals

- **LCP**: Optimizado con imágenes WebP/AVIF
- **FID**: Minimizado con lazy loading
- **CLS**: Estable con dimensiones fijas

### Lighthouse Score

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🚀 Próximos Pasos

1. **Crear imágenes OG** para cada proyecto
2. **Configurar Google Analytics**
3. **Añadir Google Search Console**
4. **Optimizar Core Web Vitals**
5. **Implementar PWA features**
