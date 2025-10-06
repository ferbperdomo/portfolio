import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Solo aplicar a la página raíz y rutas sin prefijo de idioma
    "/",
    // Excluir rutas que ya tienen prefijo de idioma para evitar bucles
    "/((?!_next|api|es|en|.*\\.|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
