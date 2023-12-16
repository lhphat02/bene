import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

const getStyles = (isDarkMode, height, width) =>
  StyleSheet.create({
    container: {
      height: height || 80,
      width: width || 80,
      borderRadius: 999,
      borderWidth: 4,
      borderColor: colors.primary,
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#171717' : 'white',
    },
    text: {
      fontSize: height * 0.25 || 20,
      fontWeight: '900',
      textAlign: 'center',
      color: colors.primary,
    },
  });

export default getStyles;
