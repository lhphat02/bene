import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,

      backgroundColor: isDarkMode ? darkColors.background : 'white',
    },
    upper_section: {
      width: '100%',
    },
    profile_avatar: {
      widht: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      color: isDarkMode ? 'white' : colors.primary,
    },
    profile_detail: {
      width: '100%',
      height: 100,
      gap: 10,
      marginTop: 40,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // backgroundColor: 'white',
    },
    text: {
      fontSize: 20,
      color: isDarkMode ? 'white' : 'gray',
    },
    button: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      gap: 10,
      width: '100%',
      height: 50,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: isDarkMode ? colors.secondary : colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    button_group: {
      flexDirection: 'column',
      gap: 10,
      width: '100%',
    },
  });

export default getStyles;
