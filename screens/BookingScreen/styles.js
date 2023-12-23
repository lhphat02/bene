import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 10,
      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 20,
      color: isDarkMode ? colors.tertiary : colors.primary,
    },
    back_button: {
      position: 'absolute',
      elevation: 10,
      zIndex: 10,
      top: 20,
      left: 20,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
      gap: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: isDarkMode ? darkColors.secondary : 'white',
    },
    book_button: {
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
    book_button_text: {
      fontSize: 16,
      fontWeight: '900',
      color: 'white',
    },
    image: {
      borderRadius: 10,
      height: 200,
      width: '100%',
    },
    rating: {
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'center',
      color: isDarkMode ? colors.tertiary : colors.primary,
      marginTop: 10,
    },
    description: {
      fontSize: 20,
      marginVertical: 10,
      color: isDarkMode ? 'white' : 'black',
    },
    text: {
      marginVertical: 5,
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
    },
  });

export default getStyles;
