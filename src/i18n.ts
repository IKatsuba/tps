import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';

export enum Languages {
  Ru = 'ru',
  En = 'en'
}

const resources = {
  [Languages.En]: {
    translation: en
  },
  [Languages.Ru]: {
    translation: ru
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Languages.Ru,
    fallbackLng: Languages.Ru,

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
