import { useContext } from 'react';
import { View, Text } from 'react-native';

import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const NotiTab = ({ data }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}></View>
      <Text style={styles.title}>{data?.title || 'Title'}</Text>
      <Text style={styles.text}>{data?.message || 'Message'}</Text>
    </View>
  );
};

export default NotiTab;
