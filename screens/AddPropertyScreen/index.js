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
import { getLocationFromAddress } from '../../utils/helper/location';
import { getLocalData } from '../../utils/helper/user';
import getStyles from './styles';
import { formatLongLat } from '../../utils/formatter';
import useDebounce from '../../hooks/useDebounce';
import createProperty from '../../redux/features/properties/actions/createProperty';
import { getRandomHouseImage } from '../../utils/helper/property';

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
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.property.loading);
  const error = useSelector((state) => state.property.error);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);
  const [formData, setFormData] = useState({
    user_id: '',
    property_name: '',
    description: '',
    address: '',
    price_per_night: '',
    max_guests: '',
    beds: '',
    bedrooms: '',
    size: '',
    long_lat: '',
    availability: 1,
    image: getRandomHouseImage(),
  });
  const debouncedAddress = useDebounce(formData.address, 1000);

  useEffect(() => {
    const initializeFormData = async () => {
      const userId = await getLocalData('userId');
      setFormData({ ...formData, user_id: userId });
    };

    initializeFormData();
  }, []);

  const handleInputChange = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  useEffect(() => {
    if (debouncedAddress) {
      const handleGetLongLat = async () => {
        if (!formData.address) {
          alert('Please fill in address');
          return;
        }

        const { address } = formData;

        const rawLongLat = await getLocationFromAddress(address);

        const longlat = formatLongLat(
          rawLongLat[0].longitude,
          rawLongLat[0].latitude
        );

        console.log('LongLat: ', longlat);

        setFormData({
          ...formData,
          long_lat: longlat,
        });

        return longlat;
      };

      handleGetLongLat();
    }
  }, [debouncedAddress]);

  const handleCreateProperty = async () => {
    const {
      user_id,
      property_name,
      description,
      address,
      price_per_night,
      max_guests,
      beds,
      bedrooms,
      long_lat,
      size,
      availability,
      image,
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
      !long_lat ||
      !size ||
      !availability ||
      !image
    ) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Create property: ', formData);

    dispatch(createProperty(formData));

    if (error) {
      Alert.alert('Error', error);
    }

    Alert.alert('Success', 'Property created successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('PropertyListScreen'),
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
      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={() =>
          Alert.alert(
            'Create property',
            'Are you sure create property with these informations?\n \nThere are some informations can not be changed once the property is created.',
            [
              {
                text: 'Cancel',
                type: 'cancel',
              },
              {
                text: 'OK',
                onPress: handleCreateProperty(),
              },
            ]
          )
        }
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="add" size={24} color="white" />
        )}
        <Text style={styles.button_text}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyListScreen;
