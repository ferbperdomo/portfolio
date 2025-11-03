"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
  src: string; // URL base (sin extensión) o URL completa con extensión
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function OptimizedVideo({
  src,
  className = "w-full h-full object-cover",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const playAttemptedRef = useRef(false);

  // Detectar iOS Safari
  const isIOSSafari =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream;

  // Intersection Observer - carga automáticamente cuando entra en vista
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          setIsInView(isIntersecting);

          if (isIntersecting) {
            setShouldLoad(true);
          } else {
            // Pausar video cuando sale del viewport para ahorrar recursos en iOS
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: isIOSSafari ? 0.1 : 0.5, // Threshold más bajo en iOS para mejor performance
        rootMargin: isIOSSafari ? "150px" : "100px", // Más margin en iOS para cargar antes
      }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [isIOSSafari]);

  // Cargar video cuando shouldLoad cambia
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    // Limpiar video anterior antes de cargar nuevo
    video.load();
  }, [shouldLoad]);

  // Manejar reproducción cuando el video entra en vista
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView || !shouldLoad || !isLoaded) return;

    // En iOS, solo intentar reproducir una vez
    if (isIOSSafari && playAttemptedRef.current) return;

    if (autoPlay && muted) {
      playAttemptedRef.current = true;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Silenciar errores de autoplay en iOS - es esperado
          if (!isIOSSafari) {
            console.error("Error playing video:", error);
          }
        });
      }
    }
  }, [isInView, shouldLoad, isLoaded, autoPlay, muted, isIOSSafari]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    // No forzar play aquí, dejamos que el useEffect lo maneje
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const handlePause = () => {
    // Limpiar referencia cuando el video se pausa
  };

  // Limpiar recursos cuando el componente se desmonta
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.pause();
        video.src = "";
        video.load();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Placeholder mientras carga o si hay error */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center z-10">
          {shouldLoad && !hasError && (
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Video solo se carga cuando shouldLoad es true */}
      <motion.video
        ref={videoRef}
        className={className}
        autoPlay={false} // No usar autoPlay nativo, lo manejamos manualmente
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={shouldLoad ? "metadata" : "none"}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPause={handlePause}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {shouldLoad && (
          <source
            src={
              src.endsWith(".webm") ? src : `${src.replace(".mp4", "")}.webm`
            }
            type="video/webm"
          />
        )}
      </motion.video>
    </div>
  );
}
