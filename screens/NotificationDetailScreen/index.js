import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import { CONSTANTS } from '../../constants/Constants';
import { formatDate, shortener } from '../../utils/formatter';
import { Divider } from '../../components';

export const getUserById = async (userId) => {
  try {
    const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
      `${CONSTANTS.ENDPOINTS.USER.GET_USER}?user_id=${userId}`
    );

    const responseData = response.data;

    if (!responseData.statusCode) {
      console.log('\x1b[33m GET USER BY ID FAILED \x1b[0m');
      return null;
    }

    console.log('\x1b[32m GET USER BY ID SUCCESS! \x1b[0m');

    return responseData.data;
  } catch (error) {
    console.log('\x1b[31m GET USER BY ID ERROR: \x1b[0m', error);
    return null;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
      `${CONSTANTS.ENDPOINTS.BOOKING.GET_BY_ID}?booking_id=${bookingId}`
    );

    const responseData = response.data;

    if (!responseData.statusCode) {
      console.log('\x1b[33m GET BOOKING BY ID FAILED \x1b[0m');
      return null;
    }

    console.log('\x1b[32m GET BOOKING BY ID SUCCESS! \x1b[0m');

    return responseData.data;
  } catch (error) {
    console.log('\x1b[31m GET BOOKING BY ID ERROR: \x1b[0m', error);
    return null;
  }
};

export const getPropertyById = async (propertyId) => {
  try {
    const response = await CONSTANTS.FUNCTIONS.AXIOS.GET(
      `${CONSTANTS.ENDPOINTS.PROPERTY.GET_BY_ID}?property_id=${propertyId}`
    );

    const responseData = response.data;

    if (!responseData.statusCode) {
      console.log('\x1b[33m GET PROPERTY BY ID FAILED \x1b[0m');
      return null;
    }

    console.log('\x1b[32m GET PROPERTY BY ID SUCCESS! \x1b[0m');

    return responseData.data;
  } catch (error) {
    console.log('\x1b[31m GET PROPERTY BY ID ERROR: \x1b[0m', error);
    return null;
  }
};

const NotificationDetailScreen = ({ navigation, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = route.params;
  const styles = getStyles(isDarkMode);
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);

  const fetchData = useCallback(async () => {
    const user = await getUserById(data?.sender_id);
    const booking = await getBookingById(data?.booking_id);
    const property = await getPropertyById(booking?.property_id);

    setUserData(user);
    setBookingData(booking);
    setPropertyData(property);
  }, [data?.sender_id, data?.booking_id, bookingData?.property_id]);

  useEffect(() => {
    fetchData();

    return () => {
      setUserData(null);
      setBookingData(null);
      setPropertyData(null);
    };
  }, []);

  const handleOnAccept = () => {
    navigation.navigate('Booking', { data: propertyData });
  };

  const handleOnDecline = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Property Image */}
      <Image
        style={styles.image}
        source={{
          uri: propertyData?.image,
        }}
      />
      <Text style={styles.header}>{propertyData?.property_name}</Text>

      {/* Detail */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
      >
        <Text style={styles.label}>Customer detail:</Text>
        <Text style={styles.text}>Name: {userData?.displayName}</Text>
        <Text style={styles.text}>Email: {userData?.email}</Text>
        <Text style={styles.text}>Phone: {userData?.phoneNumber}</Text>

        <Divider color={isDarkMode ? 'white' : 'black'} />

        <Text style={styles.label}>Booking detail:</Text>
        <Text style={styles.text}>
          From: {formatDate(bookingData?.check_in_date)}
        </Text>
        <Text style={styles.text}>
          To: {formatDate(bookingData?.check_out_date)}
        </Text>
        <Text style={styles.text}>Number of guests: {bookingData?.guests}</Text>

        <Divider color={isDarkMode ? 'white' : 'black'} />

        <Text style={styles.label}>
          Booking status: {''}
          <Text style={styles.status_text}>{bookingData?.booking_status}</Text>
        </Text>
      </ScrollView>

      {/* Button Group */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Ionicons name="close" size={24} color="white" />
          <Text style={styles.button_text}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={styles.button_text}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationDetailScreen;
