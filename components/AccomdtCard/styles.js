import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      height: 180,
      width: '95%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: 10,
      borderRadius: 10,
      backgroundColor: isDarkMode ? darkColors.primary : 'white',
      overflow: 'hidden',
      elevation: 5,
      shadowOpacity: 0.5,
      shadowRadius: 10,
      marginBottom: 20,
      marginHorizontal: 10,
    },
    image: {
      height: '100%',
      width: 120,
    },
    right_section: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    details: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'center',
      color: isDarkMode ? colors.tertiary : colors.primary,
    },
    address: {
      fontSize: 16,
      color: isDarkMode ? colors.tertiary : colors.primary,
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
    },
    price: {
      fontSize: 16,
      fontWeight: '900',
      color: isDarkMode ? colors.tertiary : colors.primary,
      alignSelf: 'flex-end',
      margin: 10,
    },
  });

export default getStyles;
