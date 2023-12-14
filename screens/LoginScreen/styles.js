import { StyleSheet } from 'react-native';

//20520683 - Luu Huynh Phat
const getStyles = (isDarkMode, colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#171717' : colors.background,
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 50,
      color: colors.primary,
    },
    form: {
      width: '100%',
      marginTop: 20,
      gap: 10,
    },
    textInput: {
      width: '100%',
      fontSize: 16,
      color: isDarkMode ? 'white' : 'gray',
      backgroundColor: isDarkMode ? '#444444' : '#EDEDED',
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
