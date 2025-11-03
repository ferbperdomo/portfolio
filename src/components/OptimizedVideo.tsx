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
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer - carga según dispositivo
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // En móvil: cargar automáticamente cuando está visible
            // En desktop: cargar solo con hover
            if (isMobile || isHovered) {
              setShouldLoad(true);
            }
          }
        });
      },
      {
        threshold: 0.5, // Requiere que esté 50% visible
        rootMargin: "100px", // Cargar 100px antes de entrar en vista
      }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile, isHovered]);

  // Cargar video cuando hay hover (desktop) o está en vista (móvil)
  useEffect(() => {
    if (isInView && !shouldLoad) {
      if (isMobile) {
        // En móvil: cargar automáticamente cuando está visible
        setShouldLoad(true);
      } else if (isHovered) {
        // En desktop: cargar solo con hover
        setShouldLoad(true);
      }
    }
  }, [isInView, isHovered, isMobile, shouldLoad]);

  // Cargar video cuando shouldLoad cambia
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    video.load();
  }, [shouldLoad]);

  // También cargar al hacer click/tap (móviles)
  const handleInteraction = () => {
    if (isInView && !shouldLoad) {
      setShouldLoad(true);
    }
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleCanPlay = () => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteraction}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center z-10">
          {!isHovered && isInView && !isMobile && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 text-sm font-medium">
                Hover para reproducir
              </div>
            </div>
          )}
          {shouldLoad && (
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Video solo se carga cuando shouldLoad es true */}
      <motion.video
        ref={videoRef}
        className={className}
        autoPlay={autoPlay && shouldLoad}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={shouldLoad ? "metadata" : "none"}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {shouldLoad && isInView && (
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
