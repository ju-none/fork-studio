import { useEffect } from "react";

interface I18n {
  changeLanguage?: (lang: string) => void;
}

interface UseLanguagesResult {
  switchLanguage: (newLang: string) => void;
}

export function useLanguages(lang: string, setLang: (lang: string) => void, i18n: I18n): UseLanguagesResult {
  const setLanguage = (newLang: string): void => {
    setLang(newLang);
    i18n.changeLanguage && i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const switchLanguage = (newLang: string): void => {
    setLanguage(newLang);
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent): void => {
      if (e.key === "language" && typeof e.newValue === "string") {
        setLang(e.newValue);
        i18n.changeLanguage && i18n.changeLanguage(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    const storedLang = localStorage.getItem("language");
    if (storedLang && storedLang !== lang) {
      setLang(storedLang);
      i18n.changeLanguage && i18n.changeLanguage(storedLang);
    }

    return () => window.removeEventListener("storage", handleStorage);
  }, [lang, setLang, i18n]);

  return {
    switchLanguage,
  };
}
