import { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemeContext } from '../../context/ThemeContext';
import { shortener } from '../../utils/formatter';
import { checkPropertyIsBooked } from '../../utils/helper/property';
import Divider from '../../components/Divider';
import getStyles from './styles';

const AccomdtDetailScreen = ({ navigation, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = route.params;

  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);
  const [isBooked, setIsBooked] = useState(false);

  const isImageUrl = data.image
    ? shortener(data.image, 4) === 'http...'
    : false;

  useEffect(() => {
    const fetchBooking = async () => {
      const result = await checkPropertyIsBooked(data?._id);

      setIsBooked(result);
    };

    fetchBooking();
  }, [data]);

  const handleOnBook = () => {
    navigation.navigate('Booking', { data: data });
  };

  console.log('data', data);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back_button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDarkMode ? 'white' : 'black'}
        />
      </TouchableOpacity>

      <ScrollView>
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
        <Text style={styles.header}>{data?.property_name || 'House'}</Text>

        <Text style={styles.header}>
          {t('property.pricePerNight')}: $ {data?.price_per_night || 'Price'}
        </Text>

        <Text style={styles.description}>
          {data?.description || 'Description'}
        </Text>

        <Divider color={isDarkMode ? 'white' : 'black'} />

        <Text style={styles.text}>
          {t('property.location')}: {data?.address || 'Address'}
        </Text>

        <Text style={styles.text}>
          {t('property.size')}: {data?.size || 'Size'} m²
        </Text>

        <Text style={styles.text}>
          {t('property.totalBedrooms')}: {data?.bedrooms || 'Bedrooms'}
        </Text>

        <Text style={styles.text}>
          {t('property.totalBeds')}: {data?.beds || 'Bed Count'}
        </Text>
      </ScrollView>

      <TouchableOpacity
        style={isBooked ? styles.book_button_isbooked : styles.book_button}
        onPress={handleOnBook}
        disabled={isBooked}
      >
        {isBooked ? (
          <>
            <Ionicons name="checkmark" size={24} color="white" />
            <Text style={styles.book_button_text}>
              {t('reservation.booked')}
            </Text>
          </>
        ) : (
          <>
            <Ionicons name="calendar-sharp" size={24} color="white" />
            <Text style={styles.book_button_text}>{t('reservation.book')}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AccomdtDetailScreen;
