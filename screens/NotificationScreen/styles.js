import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 50,
      color: colors.tertiary,
    },
    text: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
