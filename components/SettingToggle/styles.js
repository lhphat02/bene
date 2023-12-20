import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : colors.secondary,
    },
    switch: {
      color: 'orange',
      transform: [{ scale: 1.5 }],
    },
  });

export default getStyles;
