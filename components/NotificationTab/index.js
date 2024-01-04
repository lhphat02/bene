import { useContext, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import { formatDate } from '../../utils/formatter';

const NotiTab = ({ data }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const formattedDate = useMemo(
    () => formatDate(data?.time_stamp) || 'Timestamp',
    [data?.time_stamp]
  );

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const handleOnPress = () => {
    navigation.navigate('NotificationDetail', {
      data,
    });
  };

  return (
    <TouchableOpacity
      style={!data?.seen ? styles.container : styles.container_seen}
      onPress={handleOnPress}
    >
      {!data?.seen ? <View style={styles.bubble}></View> : null}
      <Text style={styles.title}>{data?.message || 'Message'}</Text>
      <Text style={styles.text}>At {formattedDate}</Text>
    </TouchableOpacity>
  );
};

export default NotiTab;
