import { StyleSheet } from 'react-native';

//20520683 - Luu Huynh Phat
const getStyles = (isDarkMode, colors) =>
  StyleSheet.create({
    container: {
      padding: 10,
      gap: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : colors.text,
    },
    button: {
      width: '80%',
      height: 50,
      backgroundColor: isDarkMode ? '#171717' : colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? colors.text : 'white',
    },
  });

export default getStyles;
