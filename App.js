// External imports
import 'intl-pluralrules';
import { Ionicons } from '@expo/vector-icons';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Internal imports
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { Tab, NavContainer } from './components/NavBar/ReactNavigation';
import { TranslationProvider } from './components/WrapComponent/TranslationProvider';
import { enTranslation, viTranslation } from './translations';

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
      <NavContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#F99417',
            tabBarInactiveTintColor: '#F5F5F5',
            tabBarStyle: {
              backgroundColor: '#4D4C7D',
              paddingVertical: 1,
              // height: 60,
            },
            tabBarShowLabel: false,
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavContainer>
    </TranslationProvider>
  );
};

export default App;
