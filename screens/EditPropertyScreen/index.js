import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';
import { editProperty } from '../../redux/features/properties/actions';

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

const EditPropertyScreen = ({ navigation, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.property.loading);
  const error = useSelector((state) => state.property.error);

  const styles = getStyles(isDarkMode);
  const { data } = route.params;
  const [formData, setFormData] = useState({
    property_id: data._id,
    property_name: data.property_name,
    description: data.description,
    address: data.address,
    price_per_night: String(data.price_per_night),
    max_guests: String(data.max_guests),
    beds: String(data.beds),
    bedrooms: String(data.bedrooms),
    long_lat: data.long_lat,
    size: String(data.size),
    image: data.image,
    availability: data.availability,
  });

  const handleInputChange = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleEditProperty = async () => {
    const {
      property_id,
      property_name,
      description,
      address,
      price_per_night,
      max_guests,
      beds,
      bedrooms,
      long_lat,
      size,
      image,
    } = formData;

    if (
      !property_id ||
      !property_name ||
      !description ||
      !address ||
      !price_per_night ||
      !max_guests ||
      !beds ||
      !bedrooms ||
      !long_lat ||
      !size ||
      !image
    ) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(editProperty(formData));

    if (error) {
      Alert.alert('Error', error);
    }

    Alert.alert('Success', 'Property edited successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('PropertyList'),
      },
    ]);
  };

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
        <Text style={styles.title}>Edit property</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.form}>
        {formInput.map((item, index) => (
          <View style={styles.textInput_container} key={index}>
            <Text style={styles.label}>
              {item.placeholder}
              {item.name === 'address' && ' (Cannot be changed)'}
            </Text>

            <TextInput
              editable={item.name !== 'address'}
              defaultValue={formData[item.name]}
              style={styles.textInput}
              placeholder={item.placeholder}
              placeholderTextColor={isDarkMode ? 'white' : 'black'}
              onChangeText={handleInputChange(item.name)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handleEditProperty}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="create" size={24} color="white" />
        )}
        <Text style={styles.button_text}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPropertyScreen;
