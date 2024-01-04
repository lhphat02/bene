import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../../context/ThemeContext';
import useUserData from '../../hooks/useUser';
import createBooking from '../../redux/features/bookings/actions/createBooking';
import { formatDate, getDayCount } from '../../utils/formatter';
import getStyles from './styles';

const dateInput = [
  {
    name: 'checkin',
    placeholder: 'Check In',
  },
  {
    name: 'checkout',
    placeholder: 'Check Out',
  },
];

const BookingScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = useUserData();

  const loading = useSelector((state) => state.booking.loading);
  const error = useSelector((state) => state.booking.error);

  // Get the dark mode value from the ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  // Get the data from the route params
  const { data } = route.params;

  // Get the styles based on the dark mode value
  const styles = getStyles(isDarkMode);

  // State variables for showing the date picker and storing the selected dates
  const [showDatePicker, setShowDatePicker] = useState({
    checkin: false,
    checkout: false,
  });
  const [formData, setFormData] = useState({
    checkin: new Date(),
    checkout: new Date(),
    guests: '',
  });

  const handleInputChange = (name) => (text) => {
    // Validate if the input is a number and lower than max_guests
    if (parseInt(text) <= data.max_guests) {
      setFormData({ ...formData, [name]: text });
    }

    // If the input is not a number or higher than max_guests, show an alert
    if (parseInt(text) > data.max_guests || parseInt(text) <= 0) {
      setFormData({ ...formData, [name]: '' });
      Alert.alert(
        'Invalid input',
        'The number of guests must be lower than max guests and higher than 0'
      );
    }
  };

  const handleCreateBooking = () => {
    // Validate the form data
    const { checkin, checkout, guests } = formData;
    if (!checkin || !checkout || !guests) {
      Alert.alert('Invalid input', 'Please fill in all the fields');
      return;
    }

    const bodyParams = {
      user_id: userData._id,
      property_id: data._id,
      check_in_date: formatDate(formData.checkin, 'short'),
      check_out_date: formatDate(formData.checkout, 'short'),
      guests: formData.guests,
      total_price:
        getDayCount(formData.checkin, formData.checkout) * data.price_per_night,
      booking_status: 'pending',
    };

    // Create the booking
    dispatch(createBooking(bodyParams));

    if (error) {
      Alert.alert('Error', error);
      return;
    }

    Alert.alert('Success', 'Booking successfully', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Search'),
      },
    ]);
  };

  // console.log('BookingScreen form data: ', formData);
  // console.log('BookingScreen route data: ', data);

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.back_button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>BOOKING</Text>

      <View style={styles.form}>
        {/* Date pickers */}
        {dateInput.map((item) => (
          <View key={item.name} style={styles.date_picker}>
            {/* Date picker button */}
            <TouchableOpacity
              style={styles.date_picker_button}
              onPress={() =>
                setShowDatePicker({ ...showDatePicker, [item.name]: true })
              }
            >
              <Ionicons name="calendar-sharp" size={24} color="white" />
              <Text style={styles.button_text}>{item.placeholder}</Text>
            </TouchableOpacity>

            {/* Date picker */}
            {showDatePicker[item.name] && (
              <DateTimePicker
                minimumDate={item.name === 'checkout' ? formData.checkin : null}
                disabled={item.name === 'checkout' && !formData.checkin}
                value={new Date()}
                mode="date"
                display="default"
                onChange={(value) => {
                  setShowDatePicker({ ...showDatePicker, [item.name]: false });
                  setFormData({
                    ...formData,
                    [item.name]: value.nativeEvent.timestamp,
                  });
                }}
              />
            )}

            {/* Display selected date */}
            {formData[item.name] && (
              <Text style={styles.date_display}>
                {formatDate(formData[item.name])}
              </Text>
            )}
          </View>
        ))}

        {/* Number of guests */}
        <View style={styles.textInput_container}>
          <Text style={styles.label}>
            Number of guests (Max guest: {data.max_guests})
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Number of guests"
            placeholderTextColor={isDarkMode ? 'white' : 'black'}
            keyboardType="numeric"
            onChangeText={handleInputChange('guests')}
          />
        </View>

        {/* Price per night */}
        <Text style={styles.text}>
          Price per night: {data.price_per_night} $
        </Text>

        {/* Total price */}
        <Text style={styles.text}>
          Total: {''}
          {getDayCount(formData.checkin, formData.checkout) *
            data.price_per_night}{' '}
          $
        </Text>
      </View>

      {/* Reserve button */}
      <TouchableOpacity style={styles.button} onPress={handleCreateBooking}>
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <Text style={styles.button_text}>Reserve your home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;
