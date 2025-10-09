# InteractiveSkyNavbar Component

Un componente React para Next.js que crea una navbar con un toggle switch interactivo donde el usuario puede controlar la transición entre modo día y noche.

## Características

### 🎨 **Colores de Marca**

Utiliza exclusivamente los colores de la marca:

- **Wine**: `#7c3a43`
- **Mint**: `#58c29e`
- **Brown**: `#2e2723`
- **Wine Dark**: `#5a3536`
- **Cream**: `#f9d4af`

### 🌅 **Funcionalidades**

1. **Detección automática del tema**: Usa `prefers-color-scheme` para determinar el estado inicial
2. **Toggle switch arrastrable**: El usuario puede arrastrar el círculo horizontalmente en una barra
3. **Transiciones suaves**: Interpolaciones fluidas con Framer Motion
4. **Diseño minimalista**:
   - Toggle switch típico con área delimitada
   - Círculo arrastrable con sol/luna dentro
   - Sin elementos externos adicionales
5. **Límites físicos**: El círculo no puede salir de la barra
6. **Tema global**: Cambia dinámicamente la clase `dark` del HTML

### 🎮 **Controles**

- **Arrastre**: Mueve el círculo horizontalmente en la barra
- **Límites**: 0px a 32px (dentro de la barra de 64px)
- **Tema**: Cambia automáticamente según la posición (mitad = 16px)

### 📱 **Responsive**

- Optimizado para móvil y desktop
- Altura fija de 80px (h-20)
- Elementos escalables

## Uso

```tsx
import InteractiveSkyNavbar from "./components/InteractiveSkyNavbar";

function App() {
  const handleThemeChange = (isDark: boolean) => {
    console.log("Theme changed to:", isDark ? "dark" : "light");
  };

  return (
    <div>
      <InteractiveSkyNavbar
        onThemeChange={handleThemeChange}
        className="custom-class"
      />
      {/* Resto del contenido */}
    </div>
  );
}
```

## Props

| Prop            | Tipo                        | Requerido | Descripción                    |
| --------------- | --------------------------- | --------- | ------------------------------ |
| `onThemeChange` | `(isDark: boolean) => void` | No        | Callback cuando cambia el tema |
| `className`     | `string`                    | No        | Clases CSS adicionales         |

## Dependencias

- **React**: ^18.0.0
- **Framer Motion**: ^10.0.0
- **Tailwind CSS**: ^3.0.0
- **Next.js**: ^13.0.0

## Estructura del Componente

```
InteractiveSkyNavbar/
├── Hook de estado inicial (prefers-color-scheme)
├── Motion values para interpolaciones
├── Handlers de drag y tema
├── Componentes SVG (Sol, Luna)
└── Renderizado del toggle switch
```

## Animaciones

- **Gradientes**: Interpolación suave entre colores de marca en la barra
- **Sol/Luna**: Transiciones de opacidad cuando se arrastra
- **Drag**: Elasticidad y límites físicos
- **Hover/Active**: Escalado del círculo al interactuar

## Accesibilidad

- ARIA labels apropiados
- Soporte para teclado (focusable)
- Contraste adecuado en ambos modos
- Indicadores visuales claros

## Rendimiento

- Optimizado con `useMotionValue` para animaciones fluidas
- Event listeners eficientes
- Re-renders mínimos
- Transiciones hardware-accelerated
