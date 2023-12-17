import { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../context/ThemeContext';
import { shortener } from '../../utils/formatter';
import getStyles from './styles';

const AccomdtCard = ({ data }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();
  const styles = getStyles(isDarkMode);

  const shortTitle = shortener(data?.property_name, 30);
  const shortAddress = shortener(data?.address, 50);
  const shortDescription = shortener(data?.description, 50);

  const handleCardPress = () => {
    navigation.navigate('AccomdtDetail', { data });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      <Image
        style={styles.image}
        source={
          data?.image_url
            ? {
                uri: data?.image_url,
              }
            : require('../../assets/house1.jpg')
        }
      />
      <View style={styles.right_section}>
        <View style={styles.details}>
          <Text style={styles.title}>{shortTitle || 'House'}</Text>
          <Text style={styles.address}>{shortAddress || 'address'}</Text>
          <Text style={styles.description}>
            {shortDescription || 'Descripttionnnnnnnnnnnnnn'}
          </Text>
        </View>
        <Text style={styles.price}>
          Price: {data?.price_per_night || 'Price'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccomdtCard;
