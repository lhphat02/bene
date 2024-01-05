import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';
import Divider from '../../components/Divider';
import { shortener } from '../../utils/formatter';

const PropertyDetailScreen = ({ navigation, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = route.params;
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);
  const isImageUrl = data.image
    ? shortener(data.image, 4) === 'http...'
    : false;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back_button}
        onPress={() => navigation.navigate('PropertyList')}
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
        style={styles.book_button}
        onPress={() => {
          navigation.navigate('EditProperty', { data: data });
        }}
      >
        <Ionicons name="create" size={24} color="white" />
        <Text style={styles.book_button_text}>{t('property.edit')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyDetailScreen;
