import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#171717' : '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      marginTop: 50,
      color: colors.tertiary,
    },
    text: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
