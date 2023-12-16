import { View, Text } from 'react-native';
import getStyles from './styles';

const Divider = ({ dividerText, color }) => {
  const styles = getStyles(color);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {dividerText && <Text style={styles.text}>{dividerText}</Text>}
      <View style={styles.line} />
    </View>
  );
};

export default Divider;
