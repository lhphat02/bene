import { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../../context/ThemeContext';
import { shortener } from '../../utils/formatter';
import getStyles from './styles';

const AccomdtCard = ({ data, onCardClicked }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const shortTitle = shortener(data?.property_name, 30);
  const shortAddress = shortener(data?.address, 50);
  const shortDescription = shortener(data?.description, 50);

  const isImageUrl = data.image
    ? shortener(data.image, 4) === 'http...'
    : false;

  return (
    <TouchableOpacity style={styles.container} onPress={onCardClicked}>
      <Image
        style={styles.image}
        source={
          isImageUrl
            ? {
                uri: data?.image,
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
