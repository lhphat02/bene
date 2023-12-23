// External imports
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Internal imports
import { AuthStack, MainBottom } from './components/Navigator';
import { TranslationProvider } from './context/TranslationProvider';
import { enTranslation, viTranslation } from './constants/translations';
import { ThemeProvider } from './context/ThemeContext';
import { StatusBar } from 'react-native';
import store from './redux/store';
import ErrorDisplayer from './components/ErrorDisplayer';
import Loading from './components/Loading';
import { getLocalData } from './utils/helper/user';
import { useEffect, useState } from 'react';
import { setToken } from './redux/features/auth/reducers/authSlice';

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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await getLocalData('token');

        if (token) {
          dispatch(setToken(token));
        }
      } catch (error) {
        console.log('\x1b[33m ERROR: \x1b[0m', error);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  return (
    <ThemeProvider>
      {isAuthenticated ? <MainBottom /> : <AuthStack />}
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
