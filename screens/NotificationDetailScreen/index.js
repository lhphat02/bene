import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '../../context/ThemeContext';
import { CONSTANTS } from '../../constants/Constants';
import { formatDate } from '../../utils/formatter';
import { Divider } from '../../components';
import getStyles from './styles';
import updateBookingStatus from '../../redux/features/bookings/actions/updateBookingStatus';
import updateNotiStatus from '../../redux/features/notifications/actions/updateNotiStatus';
import createNotification from '../../redux/features/notifications/actions/createNotification';

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
  const dispatch = useDispatch();
  const bookingLoading = useSelector((state) => state.booking.loading);
  const bookingError = useSelector((state) => state.booking.error);
  const currentUserId = useSelector((state) => state.auth.user_id);

  const { t } = useTranslation();
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
    if (!data?.seen) {
      dispatch(
        updateNotiStatus({
          noti_id: data?._id,
          seen: 1,
        })
      );
    }

    fetchData();

    return () => {
      setUserData(null);
      setBookingData(null);
      setPropertyData(null);
    };
  }, []);

  const handleOnAccept = () => {
    dispatch(
      updateBookingStatus({
        booking_id: data?.booking_id,
        booking_status: 'accepted',
        sender_id: currentUserId,
        receiver_id: data?.sender_id,
      })
    );

    dispatch(
      createNotification({
        user_id: data?.sender_id,
        receiver_id: data?.sender_id,
        sender_id: currentUserId,
        booking_id: data?.booking_id,
        message: 'Your booking has been accepted',
      })
    );

    if (bookingError) {
      return;
    }

    setBookingData({
      ...bookingData,
      booking_status: 'accepted',
    });
  };

  const handleOnDecline = () => {
    dispatch(
      updateBookingStatus({
        booking_id: data?.booking_id,
        booking_status: 'declined',
      })
    );

    dispatch(
      createNotification({
        user_id: data?.sender_id,
        receiver_id: data?.sender_id,
        sender_id: currentUserId,
        booking_id: data?.booking_id,
        message: 'Your booking has been declined',
      })
    );

    if (bookingError) {
      return;
    }

    setBookingData({
      ...bookingData,
      booking_status: 'declined',
    });
  };

  console.log('Booking data: ', bookingData);
  console.log('Property data: ', propertyData);
  console.log('User data: ', userData);

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
        {bookingData?.user_id === userData?._id ? (
          <Text style={styles.label}>{t('reservation.guestDetails')}:</Text>
        ) : (
          <Text style={styles.label}>{t('reservation.hostDetails')}:</Text>
        )}
        <Text style={styles.text}>
          {t('profile.username')}: {userData?.displayName}
        </Text>
        <Text style={styles.text}>
          {t('profile.email')}: {userData?.email}
        </Text>
        <Text style={styles.text}>
          {t('profile.phone')}: {userData?.phoneNumber}
        </Text>

        <Divider color={isDarkMode ? 'white' : 'black'} />

        <Text style={styles.label}>{t('reservation.BookingDetails')}</Text>
        <Text style={styles.text}>
          {t('reservation.checkInDate')}:{' '}
          {formatDate(bookingData?.check_in_date)}
        </Text>
        <Text style={styles.text}>
          {t('reservation.checkOutDate')}:{' '}
          {formatDate(bookingData?.check_out_date)}
        </Text>
        <Text style={styles.text}>
          {t('reservation.totalGuests')}: {bookingData?.guests}
        </Text>

        <Divider color={isDarkMode ? 'white' : 'black'} />

        <Text style={styles.label}>
          {t('reservation.status')}: {''}
          <Text style={styles.status_text}>{bookingData?.booking_status}</Text>
        </Text>
      </ScrollView>

      {/* Button Group */}
      {bookingData?.booking_status === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOnDecline}>
            <Ionicons name="close" size={24} color="white" />
            <Text style={styles.button_text}>{t('reservation.decline')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleOnAccept}>
            <Ionicons name="checkmark" size={24} color="white" />
            <Text style={styles.button_text}>{t('reservation.accept')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {bookingData?.booking_status === 'accepted' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled style={styles.button_accepted}>
            <Ionicons name="checkmark" size={24} color="white" />
            <Text style={styles.button_text_accepted}>
              {t('reservation.accepted')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {bookingData?.booking_status === 'declined' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled style={styles.button_accepted}>
            <Ionicons name="close" size={24} color="white" />
            <Text style={styles.button_text_accepted}>
              {t('reservation.declined')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NotificationDetailScreen;
