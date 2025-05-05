import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json"
import esTranslation from "./locales/es/translation.json"

// Translation resources
const resources = {
  
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
};

// Initialize i18n
i18n
  .use(Backend)             // Load translations via http (for dynamic loading)
  .use(LanguageDetector)    // Detect user language
  .use(initReactI18next)    // Pass i18n down to react-i18next
  .init({
    resources,
    lng: "en",             // Default language
    fallbackLng: "en",     // Fallback language
    
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    
    interpolation: {
      escapeValue: false  // React already safes from XSS
    }
  });

export default i18n;