import { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';
import Divider from '../../components/Divider';

const BookingScreen = ({ navigation, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = route.params;
  const styles = getStyles(isDarkMode);

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

      <Text style={styles.header}>BOOKING</Text>

      <ScrollView>
        <Text style={styles.header}>{data?.property_name || 'House'}</Text>

        <Text style={styles.description}>
          {data?.description || 'Description'}
        </Text>

        <Divider dividerText="Detail" color={isDarkMode ? 'white' : 'black'} />
      </ScrollView>

      <TouchableOpacity style={styles.book_button} onPress={() => {}}>
        <Ionicons name="calendar-sharp" size={24} color="white" />
        <Text style={styles.book_button_text}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;
