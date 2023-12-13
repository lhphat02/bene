import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

export const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();
export const NavContainer = NavigationContainer;
