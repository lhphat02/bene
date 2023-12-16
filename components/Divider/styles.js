import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

const { colors } = theme;

const getStyles = (color) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    line: {
      height: 1,
      flex: 1,
      backgroundColor: color || colors.primary,
      marginVertical: 8,
    },
    text: {
      marginHorizontal: 8,
      textAlign: 'center',
      color: color || colors.primary,
    },
  });

export default getStyles;
