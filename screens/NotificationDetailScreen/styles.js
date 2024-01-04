import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 20,
      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      color: colors.tertiary,
    },
    scrollview: {
      // paddingVertical: 20,
      gap: 10,
    },
    image: {
      borderRadius: 10,
      height: 160,
      width: '100%',
    },
    label: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
    },
    text: {
      marginTop: 10,
      fontSize: 20,
      color: isDarkMode ? 'white' : 'gray',
    },
    status_text: {
      marginLeft: 10,
      paddingLeft: 10,
      fontSize: 20,
      color: colors.tertiary,
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    button: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: isDarkMode ? 'white' : 'black',
      gap: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    button_text: {
      fontSize: 16,
      fontWeight: '900',
      color: 'white',
    },
  });

export default getStyles;
