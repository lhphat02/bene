import { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ThemeContext } from '../../context/ThemeContext';
import {
  AccomdtDetailScreen,
  AccomdtListScreen,
  AddPropertyScreen,
  HomeScreen,
  LoginScreen,
  NotificationDetailScreen,
  NotificationScreen,
  ProfileScreen,
  PropertyDetailScreen,
  PropertyListScreen,
  RegisterScreen,
  SearchScreen,
  SettingSceen,
} from '../../screens';
import theme from '../../constants/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const { colors, darkColors } = theme;

const AuthStack = () => {
  // Access theme context from the ThemeContext provider
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: isDarkMode ? '#413F42' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register',
        }}
      />
    </Stack.Navigator>
  );
};

const NotificationStack = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? darkColors.primary : '#fff',
        },
        headerTitleAlign: 'center',
        headerTintColor: isDarkMode ? colors.tertiary : '#000',
      }}
    >
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'Notification',
        }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={{
          title: 'Notification Detail',
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? darkColors.primary : '#fff',
        },
        headerTitleAlign: 'center',
        headerTintColor: isDarkMode ? colors.tertiary : '#000',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingSceen}
        options={{
          title: 'Setting',
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * Renders a stack navigator for property-related screens.
 *
 * @returns {JSX.Element} The rendered stack navigator.
 */
const PropertyStack = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="PropertyList"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#413F42' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
      }}
    >
      <Stack.Screen
        name="PropertyList"
        component={PropertyListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        options={{
          title: 'Add property',
        }}
      />
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailScreen}
        options={{
          title: 'Accommodation detail',
        }}
      />
    </Stack.Navigator>
  );
};

const AccomdtStack = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: isDarkMode ? '#413F42' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} options={{}} />
      <Stack.Screen
        name="AccomdtList"
        component={AccomdtListScreen}
        options={{
          title: 'Add property',
        }}
      />
      <Stack.Screen
        name="AccomdtDetail"
        component={AccomdtDetailScreen}
        options={{
          title: 'Accommodation detail',
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * Renders a top tab navigator component for the accommodation list.
 * @returns {JSX.Element} The rendered top tab navigator component.
 */
const AccomdtTopTab = () => {
  // Access theme context from the ThemeContext provider
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <TopTab.Navigator
      initialRouteName="AccomdtStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? darkColors.primary : '#fff',
        },
        headerTintColor: isDarkMode ? 'white' : '#000',
        tabBarStyle: {
          backgroundColor: isDarkMode ? darkColors.primary : '#fff',
        },
        tabBarActiveTintColor: isDarkMode ? colors.tertiary : colors.primary,
        tabBarIndicatorStyle: {
          backgroundColor: isDarkMode ? colors.tertiary : colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="AccomdtStack"
        component={AccomdtStack}
        options={{
          title: 'Find home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PropertyStack"
        component={PropertyStack}
        options={{
          title: 'Your homes',
        }}
      />
    </TopTab.Navigator>
  );
};

/**
 * Renders the main bottom navigation component.
 * @returns {JSX.Element} The rendered main bottom navigation component.
 */
const MainBottom = () => {
  // Access theme context from the ThemeContext provider
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: isDarkMode ? '#fff' : '#000',
        headerStyle: {
          backgroundColor: isDarkMode ? darkColors.primary : '#fff',
        },
        headerTitleAlign: 'center',

        tabBarStyle: {
          backgroundColor: isDarkMode ? darkColors.primary : '#fff',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="home"
              color={
                focused
                  ? isDarkMode
                    ? colors.tertiary
                    : colors.primary
                  : isDarkMode
                  ? darkColors.tertiary
                  : colors.tertiary
              }
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AccomdtTopTab"
        component={AccomdtTopTab}
        options={{
          headerShown: false,
          title: 'Accommodations',
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="search"
              color={
                focused
                  ? isDarkMode
                    ? colors.tertiary
                    : colors.primary
                  : isDarkMode
                  ? darkColors.tertiary
                  : colors.tertiary
              }
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationStack"
        component={NotificationStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="notifications"
              color={
                focused
                  ? isDarkMode
                    ? colors.tertiary
                    : colors.primary
                  : isDarkMode
                  ? darkColors.tertiary
                  : colors.tertiary
              }
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="person-circle"
              color={
                focused
                  ? isDarkMode
                    ? colors.tertiary
                    : colors.primary
                  : isDarkMode
                  ? darkColors.tertiary
                  : colors.tertiary
              }
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { AuthStack, MainBottom };
