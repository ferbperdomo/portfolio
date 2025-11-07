"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../app/[locale]/Navbar";
import { useTheme } from "../../contexts/ThemeContext";
import FloatingThemeSelector from "../FloatingThemeSelector";

export default function WhyFerbperdomoPageContent() {
  const t = useTranslations();
  const params = useParams();
  const locale = params?.locale || "es";
  const {
    themeState,
    handleThemeChange,
    getBackgroundClass,
    getPrimaryColor,
    getSecondaryColor,
  } = useTheme();

  const getButtonStyle = () => {
    switch (themeState) {
      case 0:
        return "bg-primary-wine text-white hover:bg-wine-600";
      case 1:
        return "bg-primary-wine text-white hover:bg-wine-600";
      case 2:
        return "bg-white text-black hover:bg-gray-200";
      default:
        return "bg-primary-wine text-white hover:bg-wine-600";
    }
  };

  const getCardBackground = () => {
    switch (themeState) {
      case 0:
        return "bg-white/90 border-gray-200/50 backdrop-blur-sm";
      case 1:
        return "bg-white/20 border-white/30 backdrop-blur-sm";
      case 2:
        return "bg-white/10 border-white/20 backdrop-blur-sm";
      default:
        return "bg-white/90 border-gray-200/50 backdrop-blur-sm";
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <Navbar />
      <FloatingThemeSelector
        currentTheme={themeState}
        onThemeChange={(theme: number) => handleThemeChange(theme as 0 | 1 | 2)}
      />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-6 md:px-4">
        <div className="max-w-4xl mx-auto pl-10 md:pl-0">
          <motion.h1
            className={`text-5xl md:text-6xl font-bold mb-12 text-center ${getPrimaryColor()}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {t("whyFerbperdomo.title")}
          </motion.h1>

          {/* Match Visual - Círculos estilo Tinder */}
          <motion.div
            className="flex justify-center items-center gap-6 mb-8 md:mb-12 px-4 relative pl-10 md:pl-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-2xl z-10 ${
                themeState === 0
                  ? "border-wine-500"
                  : themeState === 1
                  ? "border-mint-600"
                  : "border-white"
              }`}
              initial={{ x: -200, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.5,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src="/cris.jpg"
                alt="Cristian Perdomo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </motion.div>
            <motion.div
              className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-2xl z-10 ${
                themeState === 0
                  ? "border-wine-500"
                  : themeState === 1
                  ? "border-mint-600"
                  : "border-white"
              }`}
              initial={{ x: 200, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.7,
              }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Image
                src="/ferb_fletcher.png"
                alt="Ferb Fletcher"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </motion.div>
            {/* Efecto de pulse cuando se encuentran */}
            <motion.div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 1,
                delay: 1.2,
                ease: "easeOut",
              }}
            >
              <div
                className={`w-48 h-48 md:w-64 md:h-64 rounded-full ${
                  themeState === 0
                    ? "bg-gradient-radial-wine"
                    : themeState === 1
                    ? "bg-gradient-radial-mint"
                    : "bg-gradient-radial-white"
                }`}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Sections - Narración fluida sin títulos */}
      <section className="py-8 md:py-12 px-6 md:px-4">
        <div className="max-w-4xl mx-auto space-y-12 pl-10 md:pl-0">
          {/* Párrafo 1 */}
          <motion.p
            className={`text-lg md:text-xl leading-relaxed ${getSecondaryColor()}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {t("whyFerbperdomo.paragraph1")}
          </motion.p>

          {/* Párrafo 2 */}
          <motion.p
            className={`text-lg md:text-xl leading-relaxed ${getSecondaryColor()}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t("whyFerbperdomo.paragraph2")}
          </motion.p>

          {/* Párrafo 3 */}
          <motion.p
            className={`text-lg md:text-xl leading-relaxed ${getSecondaryColor()}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("whyFerbperdomo.paragraph3")}
          </motion.p>

          {/* Párrafo 4 */}
          <motion.p
            className={`text-lg md:text-xl leading-relaxed ${getSecondaryColor()}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t("whyFerbperdomo.paragraph4")}
          </motion.p>

          {/* Fun Fact - Card destacada */}
          <motion.div
            className={`rounded-3xl p-8 md:p-12 border-2 ${getCardBackground()} shadow-xl`}
            initial={{ opacity: 0, rotateY: 15 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02, rotateZ: 1 }}
          >
            <motion.p
              className={`text-lg md:text-xl leading-relaxed text-center ${getPrimaryColor()}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t("whyFerbperdomo.funFact")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Final Section - Ferb con pulgar arriba */}
      <section className="pt-8 pb-32 px-6 md:px-4 relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 0L60 30L30 60L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Elementos decorativos flotantes */}
        <motion.div
          className={`absolute top-20 left-10 w-24 h-24 rounded-full opacity-5 ${
            themeState === 0
              ? "bg-wine-400"
              : themeState === 1
              ? "bg-mint-600"
              : "bg-gray-400"
          }`}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className={`absolute bottom-32 right-20 w-16 h-16 rounded-full opacity-5 ${
            themeState === 0
              ? "bg-wine-500"
              : themeState === 1
              ? "bg-mint-700"
              : "bg-gray-500"
          }`}
          animate={{
            y: [0, 10, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/4 w-20 h-20 rounded-full opacity-5 ${
            themeState === 0
              ? "bg-wine-300"
              : themeState === 1
              ? "bg-mint-500"
              : "bg-gray-300"
          }`}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-4xl mx-auto flex flex-col items-center pl-16 md:pl-0 relative z-10">
          {/* Ferb flotante - arriba */}
          <motion.div
            className="relative w-full max-w-md aspect-square mb-12"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [-20, -40, -20],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
                times: [0, 0.3, 1],
                delay: 1.5,
              },
            }}
          >
            <Image
              src="/ferb.png"
              alt="Ferb with thumbs up"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </motion.div>

          {/* Botón Volver */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href={`/${locale}`}>
              <motion.button
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${getButtonStyle()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("whyFerbperdomo.backButton")}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
