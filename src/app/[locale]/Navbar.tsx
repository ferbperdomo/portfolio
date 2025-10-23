"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useTheme } from "../../contexts/ThemeContext";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDarkMode, themeState } = useTheme();

  // Check if we're on the home page or a project page
  const isHomePage =
    pathname === "/es" ||
    pathname === "/en" ||
    pathname === "/es/" ||
    pathname === "/en/";

  // Generate correct hrefs based on current page
  const getHomeHref = () => (isHomePage ? "#" : "/");
  const getAboutHref = () => (isHomePage ? "#about" : "/#about");
  const getProjectsHref = () => (isHomePage ? "#projects" : "/#projects");
  const getContactHref = () => (isHomePage ? "#cta" : "/#cta");

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle navbar visibility on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Hero section height

      // Only hide navbar after hero section
      if (currentScrollY > heroHeight) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsNavbarVisible(false);
        } else {
          // Scrolling up - show navbar
          setIsNavbarVisible(true);
        }
      } else {
        // In hero section - always show navbar
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Menu - Vertical List */}
      <div
        className={`hidden md:block fixed top-6 right-6 z-50 transition-all duration-300 ease-in-out ${
          isNavbarVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 items-end backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
          <Link
            href={getHomeHref()}
            className={`text-lg font-medium transition-colors hover:scale-105 text-right ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-gray-600"
            }`}
          >
            {t("menu.home")}
          </Link>
          <Link
            href={getAboutHref()}
            className={`text-lg font-medium transition-colors hover:scale-105 text-right ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-gray-600"
            }`}
          >
            {t("menu.about")}
          </Link>
          <Link
            href={getProjectsHref()}
            className={`text-lg font-medium transition-colors hover:scale-105 text-right ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-gray-600"
            }`}
          >
            {t("menu.projects")}
          </Link>
          <Link
            href={getContactHref()}
            className={`text-lg font-medium transition-colors hover:scale-105 text-right ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-gray-600"
            }`}
          >
            {t("menu.contact")}
          </Link>
          <div className="mt-4 flex justify-end">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Mobile Burger Menu Button */}
      <div
        className={`md:hidden fixed top-6 right-6 z-[9999] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-10 h-10 flex items-center justify-center group transition-all duration-200"
          aria-label={t("navigation.openMenu")}
          title={t("navigation.openMenuTitle")}
        >
          <div className="flex flex-col justify-center items-center space-y-1">
            <div className="w-5 h-0.5 bg-primary-wine transition-all duration-200" />
            <div className="w-5 h-0.5 bg-primary-wine transition-all duration-200" />
            <div className="w-5 h-0.5 bg-primary-wine transition-all duration-200" />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay - Only on mobile */}
      {isMenuOpen && (
        <div
          className={`navbar-mobile md:hidden fixed inset-0 z-[100] backdrop-blur-lg transition-all duration-300 ease-in-out supports-[backdrop-filter]:backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-gray-800/80 bg-white/95 dark:bg-gray-900/95 ${
            isDarkMode ? "bg-gray-800/95" : "bg-white/95"
          }`}
          style={{
            backgroundColor:
              themeState === 0
                ? "rgba(var(--color-wine-50), 0.8)"
                : themeState === 1
                ? "rgba(var(--color-mint-200), 0.8)"
                : "rgba(var(--color-primary-black-lighter), 0.8)",
          }}
        >
          <div className="flex flex-col h-screen justify-center items-center space-y-8 px-6 py-20 w-full">
            <Link
              href={getHomeHref()}
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.home")}
            </Link>
            <Link
              href={getAboutHref()}
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.about")}
            </Link>
            <Link
              href={getProjectsHref()}
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.projects")}
            </Link>
            <Link
              href={getContactHref()}
              className={`text-2xl font-medium transition-colors ${
                isDarkMode
                  ? "text-white hover:text-gray-300"
                  : "text-gray-900 hover:text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("menu.contact")}
            </Link>
            <div className="mt-8">
              <LanguageSelector />
            </div>

            {/* Close button at the bottom */}
            <div className="mt-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-4 rounded-full transition-all duration-200 hover:bg-white/20"
                aria-label={t("navigation.closeMenu")}
                title={t("navigation.closeMenuTitle")}
              >
                <Image
                  src="/cross.png"
                  alt="Close menu"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
