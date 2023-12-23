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
    form: {
      paddingBottom: 50,
      padding: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      borderRadius: 10,
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
    textInput: {
      width: '100%',
      fontSize: 16,
      backgroundColor: isDarkMode ? '#444444' : colors.background,
      color: isDarkMode ? 'white' : 'black',
      padding: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? 'white' : colors.primary,
    },
    back_button: {
      position: 'absolute',
      elevation: 10,
      zIndex: 10,
      top: 10,
      left: 10,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
      gap: 10,
      borderRadius: 10,
      backgroundColor: isDarkMode ? darkColors.secondary : 'white',
    },
    button_text: {
      fontSize: 16,
      fontWeight: '900',
      color: isDarkMode ? 'white' : 'black',
    },
    header: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      width: '100%',
      flex: 1,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
