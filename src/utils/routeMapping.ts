/**
 * Route mapping between locales
 * Maps English route names to Spanish route names and vice versa
 */

export const routeMapping: Record<string, Record<string, string>> = {
  es: {
    projects: "proyectos",
    "why-ferbperdomo": "por-que-ferbperdomo",
  },
  en: {
    proyectos: "projects",
    "por-que-ferbperdomo": "why-ferbperdomo",
  },
};

/**
 * Translates a route path from one locale to another
 * @param path - The path to translate (e.g., "/es/projects/my-project" or "/en/why-ferbperdomo")
 * @param targetLocale - The target locale ("es" or "en")
 * @returns The translated path
 */
export function translateRoute(path: string, targetLocale: string): string {
  // Remove leading slash and split
  const pathParts = path.replace(/^\//, "").split("/").filter(Boolean);
  
  // Extract current locale (first part)
  const currentLocale = pathParts[0];
  
  // Get the route name (second part)
  const routeName = pathParts[1];
  
  // If no route name, just return the locale
  if (!routeName) {
    return `/${targetLocale}`;
  }
  
  // Check if we need to translate the route name
  // Always translate to ensure we use the correct route name for the target locale
  const targetMapping = routeMapping[targetLocale];
  const translatedRouteName = targetMapping[routeName] || routeName;
  
  // Reconstruct the path with translated route name
  const restOfPath = pathParts.slice(2).join("/");
  const translatedPath = restOfPath 
    ? `/${targetLocale}/${translatedRouteName}/${restOfPath}`
    : `/${targetLocale}/${translatedRouteName}`;
  
  return translatedPath;
}

/**
 * Gets the localized route name for a given locale
 * @param routeName - The route name (e.g., "projects" or "proyectos")
 * @param locale - The target locale ("es" or "en")
 * @returns The localized route name
 */
export function getLocalizedRouteName(routeName: string, locale: string): string {
  // If the route name is already localized for the target locale, return it
  if (locale === "es" && (routeName === "proyectos" || routeName === "por-que-ferbperdomo")) {
    return routeName;
  }
  if (locale === "en" && (routeName === "projects" || routeName === "why-ferbperdomo")) {
    return routeName;
  }
  
  // Translate the route name from English to Spanish or vice versa
  // First check if we need to translate from English to Spanish
  if (locale === "es") {
    const esMapping = routeMapping.es;
    if (esMapping[routeName]) {
      return esMapping[routeName];
    }
  }
  
  // Or translate from Spanish to English
  if (locale === "en") {
    const enMapping = routeMapping.en;
    if (enMapping[routeName]) {
      return enMapping[routeName];
    }
  }
  
  // If no mapping found, return the original route name
  return routeName;
}

