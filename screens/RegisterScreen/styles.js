import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    container: {
      flex: 1,
      gap: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#171717' : 'white',
    },
    header: {
      marginTop: 20,
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      color: isDarkMode ? 'white' : colors.primary,
    },
    form: {
      width: '100%',
      marginTop: 20,
      gap: 20,
    },
    textInput: {
      width: '100%',
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#444444' : colors.background,
      padding: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? 'white' : colors.primary,
    },
    button: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      gap: 10,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default getStyles;
