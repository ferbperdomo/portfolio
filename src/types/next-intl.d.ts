declare module "next-intl" {
  export function useTranslations(): (key: string) => string;
  export function getMessages(): Promise<Record<string, unknown>>;
  export { NextIntlClientProvider } from "next-intl";
}
