import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//translation json files
import TRANSLATIONS_EN from "./translations/en.json";
import TRANSLATIONS_TR from "./translations/tr.json";

//translations resources
const resources = {
  en: {
    translation: TRANSLATIONS_EN,
  },
  tr: {
    translation: TRANSLATIONS_TR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: window.localStorage.getItem("language"), // for now
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
