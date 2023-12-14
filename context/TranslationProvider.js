import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';

const TranslationProvider = ({ children }) => {
  i18n
    .use(initReactI18next) // Initialize i18next with React
    .use(HttpApi); // Use HttpApi to load translations dynamically

  return <>{children}</>;
};

export { TranslationProvider };
