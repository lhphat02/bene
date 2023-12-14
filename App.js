// External imports
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { NavigationContainer } from '@react-navigation/native';

// Internal imports
import { MainBottom } from './components/Navigator';
import { TranslationProvider } from './context/TranslationProvider';
import { enTranslation, viTranslation } from './translations';
import { ThemeProvider } from './context/ThemeContext';
import { NativeScreenNavigationContainer } from 'react-native-screens';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const App = () => {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainBottom />
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};

export default App;
