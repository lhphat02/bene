import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      width: '94%',
      padding: 20,
      gap: 10,
      marginLeft: 10,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      shadowColor: isDarkMode ? darkColors.primary : 'gray',
      borderRadius: 10,
      elevation: 10,
      backgroundColor: isDarkMode ? darkColors.tertiary : 'white',
    },
    container_seen: {
      width: '94%',
      padding: 20,
      gap: 10,
      marginLeft: 10,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      shadowColor: isDarkMode ? darkColors.primary : 'gray',
      borderRadius: 10,
      elevation: 10,
      backgroundColor: isDarkMode ? darkColors.secondary : 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'center',
      color: isDarkMode ? colors.tertiary : colors.primary,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
      color: isDarkMode ? 'white' : 'gray',
    },
    bubble: {
      position: 'absolute',
      top: -5,
      right: -5,
      width: 15,
      height: 15,
      borderRadius: 7.5,
      backgroundColor: colors.tertiary,
    },
  });

export default getStyles;
