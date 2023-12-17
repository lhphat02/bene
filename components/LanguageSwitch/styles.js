import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

//20520683 - Luu Huynh Phat
const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      padding: 10,
      gap: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : colors.secondary,
    },
    button: {
      width: '80%',
      height: 50,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default getStyles;
