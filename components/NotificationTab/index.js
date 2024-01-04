import { useContext } from 'react';
import { View, Text } from 'react-native';

import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import { formatDate } from '../../utils/formatter';

const NotiTab = ({ data }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const formattedDate = formatDate(data?.time_stamp) || 'Timestamp';
  const styles = getStyles(isDarkMode);

  console.log('data', data);

  return (
    <View style={!data?.seen ? styles.container : styles.container_seen}>
      {!data?.seen ? <View style={styles.bubble}></View> : null}
      <Text style={styles.title}>{data?.message || 'Message'}</Text>
      <Text style={styles.text}>At {formattedDate}</Text>
    </View>
  );
};

export default NotiTab;
