import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const messages: Record<string, any> = {};
const files = import.meta.glob("./content/*/*.json", { eager: true });
export const languages: string[] = [];

for (const [path, mod] of Object.entries(files)) {
  const match = path.match(/\.\/content\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;

  const [, locale, page] = match;
  if (!messages[locale]) messages[locale] = {};

  if (!languages.includes(locale)) languages.push(locale);
  messages[locale][page.toLowerCase()] = (mod as any).default;
}
const namespaces = Object.values(files)
  .map((_, i) => Object.keys(messages[languages[0]] || {})[i])
  .filter(Boolean);

i18n.use(initReactI18next).init({
  resources: messages,
  lng: "en",
  ns: namespaces,
  defaultNS: "home",
  interpolation: { escapeValue: false },
});

export function usePageTranslation() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments.length > 0 ? pathSegments[0] : "home";
  const { t } = useTranslation(page);

  return t;
}

export default i18n;