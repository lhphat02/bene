import { StyleSheet } from 'react-native';

import theme from '../../constants/theme';

const { colors, darkColors } = theme;

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      gap: 10,
      paddingHorizontal: 20,
    },
    list: {
      flexDirection: 'column',
      width: '100%',
      overflow: 'visible',
      flex: 1,
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
      color: isDarkMode ? 'white' : 'gray',
    },
  });

export default getStyles;
