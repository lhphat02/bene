import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
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
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = route.params;
  const styles = getStyles(isDarkMode);
  const [showDatePicker, setShowDatePicker] = useState({
    checkin: false,
    checkout: false,
  });
  const [date, setDate] = useState({
    checkin: new Date(),
    checkout: new Date(),
  });

  console.log('Checkin date', date.checkin);
  console.log('Checkout date', date.checkout);
  console.log('data', data.price_per_night);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back_button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>BOOKING</Text>

      <View style={styles.form}>
        {dateInput.map((item) => (
          <View key={item.name} style={styles.date_picker}>
            <TouchableOpacity
              style={styles.date_picker_button}
              onPress={() =>
                setShowDatePicker({ ...showDatePicker, [item.name]: true })
              }
            >
              <Ionicons name="calendar-sharp" size={24} color="white" />
              <Text style={styles.button_text}>{item.placeholder}</Text>
            </TouchableOpacity>

            {showDatePicker[item.name] && (
              <DateTimePicker
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
            {date[item.name] && (
              <Text style={styles.date_display}>
                {formatDate(date[item.name])}
              </Text>
            )}
          </View>
        ))}

        <Text style={styles.text}>
          Price per night: {data.price_per_night} $
        </Text>

        <Text style={styles.text}>
          Total: {''}
          {getDayCount(date.checkin, date.checkout) * data.price_per_night} $
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Ionicons name="calendar-sharp" size={24} color="white" />
        <Text style={styles.button_text}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;
