import { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ThemeContext } from '../../context/ThemeContext';
import {
  AddPropertyScreen,
  HomeScreen,
  LoginScreen,
  NotificationScreen,
  ProfileScreen,
  PropertyDetailScreen,
  PropertyListScreen,
  RegisterScreen,
  SearchScreen,
} from '../../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const AuthStack = () => {
  // Access theme context from the ThemeContext provider
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
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

/**
 * Renders a top tab navigator component for the accommodation list.
 * @returns {JSX.Element} The rendered top tab navigator component.
 */
const AccomdtListTopTab = () => {
  // Access theme context from the ThemeContext provider
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <TopTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#413F42' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PropertyStack"
        component={PropertyStack}
        options={{
          title: 'Add Note',
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
          backgroundColor: isDarkMode ? '#413F42' : '#fff',
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#413F42' : '#fff',
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
              color={focused ? 'orange' : 'gray'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AccomdtList"
        component={AccomdtListTopTab}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="settings"
              color={focused ? 'orange' : 'gray'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="settings"
              color={focused ? 'orange' : 'gray'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="person-circle"
              color={focused ? 'orange' : 'gray'}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { AuthStack, MainBottom };
