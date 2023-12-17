import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      gap: 10,
    },
    searchBar__unclicked: {
      padding: 10,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: isDarkMode ? '#d9dbda' : colors.primary,
      borderRadius: 15,
      alignItems: 'center',
    },
    searchBar__clicked: {
      padding: 10,
      flexDirection: 'row',
      width: '78%',
      backgroundColor: isDarkMode ? '#d9dbda' : colors.primary,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      width: '90%',
    },
  });

export default getStyles;
