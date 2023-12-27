import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
      alignItems: 'center',
      padding: 20,
      overflow: 'visible',

      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    list: {
      width: '100%',
      flex: 1,
      overflow: 'visible',
    },
    text: {
      marginTop: 32,
      textAlign: 'center',
      fontSize: 24,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
