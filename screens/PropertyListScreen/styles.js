import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
      alignItems: 'center',
      padding: 10,
      overflow: 'visible',

      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    button: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    button_text: {
      fontSize: 16,
      fontWeight: '900',
      color: isDarkMode ? 'white' : 'black',
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 50,
      color: colors.tertiary,
    },
    list: {
      width: '100%',
      flex: 1,
      overflow: 'visible',
    },
    text: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
