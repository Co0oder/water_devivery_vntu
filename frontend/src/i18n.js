import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translations from './translations';
import translationKeys from "./translations/translation-keys";

const resources = {
    ua: {translation: translations.ua},
    ru: {translation: translations.ru}
}

const currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'ua'

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: currentLanguage,
    fallbackLng: 'ua', 
    interpolation: {
      escapeValue: false
    }
  });

export const i18n = i18next;
export const keys = translationKeys 