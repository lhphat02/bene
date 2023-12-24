import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ThemeContext } from '../../context/ThemeContext';
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
  const [date, setDate] = useState({
    checkin: new Date(),
    checkout: new Date(),
  });

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
                minimumDate={item.name === 'checkout' ? date.checkin : null}
                disabled={item.name === 'checkout' && !date.checkin}
                value={new Date()}
                mode="date"
                display="default"
                onChange={(value) => {
                  setShowDatePicker({ ...showDatePicker, [item.name]: false });
                  setDate({
                    ...date,
                    [item.name]: value.nativeEvent.timestamp,
                  });
                }}
              />
            )}

            {/* Display selected date */}
            {date[item.name] && (
              <Text style={styles.date_display}>
                {formatDate(date[item.name])}
              </Text>
            )}
          </View>
        ))}

        {/* Price per night */}
        <Text style={styles.text}>
          Price per night: {data.price_per_night} $
        </Text>

        {/* Total price */}
        <Text style={styles.text}>
          Total: {''}
          {getDayCount(date.checkin, date.checkout) * data.price_per_night} $
        </Text>
      </View>

      {/* Reserve button */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <Text style={styles.button_text}>Reserve your home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;
