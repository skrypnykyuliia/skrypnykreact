
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationUA from './locales/ua/translation.json';
import translationDE from './locales/de/translation.json';
import translationPL from './locales/pl/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ru: {
      translation: translationRU,
    },
    ua: {
      translation: translationUA,
    },
    de: {
      translation: translationDE,
    },
    pl: {
      translation: translationPL,
    },
  },
  lng: "en", 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
