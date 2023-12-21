// External imports
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';

// Internal imports
import { AuthStack, MainBottom } from './components/Navigator';
import { TranslationProvider } from './context/TranslationProvider';
import { enTranslation, viTranslation } from './constants/translations';
import { ThemeProvider } from './context/ThemeContext';
import { StatusBar } from 'react-native';
import store from './redux/store';
import ErrorDisplayer from './components/ErrorDisplayer';
import Loading from './components/Loading';

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

const AppContent = () => {
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      {token ? <MainBottom /> : <AuthStack />}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <TranslationProvider>
      <NavigationContainer>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </NavigationContainer>
    </TranslationProvider>
  );
};

export default App;
