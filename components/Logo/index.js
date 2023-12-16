import { useContext } from 'react';
import { View, Text } from 'react-native';

import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const Logo = ({ height, width }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode, height, width);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>bE&E</Text>
    </View>
  );
};

export default Logo;
