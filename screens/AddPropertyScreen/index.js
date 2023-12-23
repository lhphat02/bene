import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { ThemeContext } from '../../context/ThemeContext';
import { getLocationFromAddress } from '../../utils/helper/location';
import getStyles from './styles';

const formInput = [
  {
    name: 'property_name',
    placeholder: 'Property name',
  },
  {
    name: 'description',
    placeholder: 'Description',
  },
  {
    name: 'address',
    placeholder: 'Address',
  },
  {
    name: 'price_per_night',
    placeholder: 'Price per night',
  },
  {
    name: 'max_guests',
    placeholder: 'Max guests',
  },
  {
    name: 'beds',
    placeholder: 'Beds',
  },
  {
    name: 'bedrooms',
    placeholder: 'Bedrooms',
  },
  {
    name: 'size',
    placeholder: 'Size',
  },
];

const PropertyListScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const userId = useSelector((state) => state.auth.user_id);
  const styles = getStyles(isDarkMode);
  const [formData, setFormData] = useState({
    user_id: userId,
    property_name: '',
    description: '',
    address: '',
    price_per_night: '',
    max_guests: '',
    beds: '',
    bedrooms: '',
    size: '',
    long_lat: '',
    availability: 0,
  });

  const handleInputChange = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleGetLongLat = async () => {
    const { address } = formData;
    const longLat = await getLocationFromAddress(address);
    console.log('longLat', longLat);
    setFormData({ ...formData, long_lat: longLat });
  };

  console.log('Address', formData.address);

  const handleCreateProperty = () => {
    const {
      user_id,
      property_name,
      description,
      address,
      price_per_night,
      max_guests,
      beds,
      bedrooms,
      size,
      long_lat,
      availability,
    } = formData;

    if (
      !user_id ||
      !property_name ||
      !description ||
      !address ||
      !price_per_night ||
      !max_guests ||
      !beds ||
      !bedrooms ||
      !size ||
      !long_lat ||
      !availability
    ) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(createProperty(formData));
  };

  console.log('userId', userId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <Text style={styles.title}>Add new property</Text>
      </View>
      <ScrollView style={styles.list} contentContainerStyle={styles.form}>
        {formInput.map((item, index) => (
          <TextInput
            key={index}
            style={styles.textInput}
            placeholder={item.placeholder}
            placeholderTextColor={isDarkMode ? 'white' : 'black'}
            onChangeText={handleInputChange(item.name)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleGetLongLat}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.button_text}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyListScreen;
