import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      overflow: 'visible',

      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    header: {
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'center',
      color: isDarkMode ? 'white' : colors.primary,
    },
    list: {
      width: '100%',
      flex: 1,
      overflow: 'visible',
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
