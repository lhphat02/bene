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
      backgroundColor: isDarkMode ? darkColors.secondary : colors.primary,
    },
    form: {
      flex: 1,
      alignItems: 'center',
      gap: 20,
      padding: 20,
      paddingTop: 60,
    },
    date_picker: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // backgroundColor: isDarkMode ? darkColors.secondary : 'white',
    },
    date_picker_button: {
      width: '45%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: isDarkMode ? 'white' : 'black',
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: colors.primary,
    },
    date_display: {
      width: '55%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: isDarkMode ? 'white' : 'black',
      borderColor: isDarkMode ? darkColors.tertiary : 'black',
      borderWidth: 2.5,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      // backgroundColor: isDarkMode ? darkColors.secondary : 'white',
    },
    button: {
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
    text: {
      fontSize: 20,
      fontWeight: '900',
      color: isDarkMode ? 'white' : 'black',
    },
  });

export default getStyles;
