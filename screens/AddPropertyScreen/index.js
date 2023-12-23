import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import SearchBar from '../../components/SearchBar';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import AccomdtCard from '../../components/AccomdtCard';
import mockPropertyData from '../../constants/mock/mockPropertyData';

const PropertyListScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const userId = useSelector((state) => state.auth.user_id);
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

  const styles = getStyles(isDarkMode);

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
        <TextInput
          style={styles.textInput}
          placeholder="Property name"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) =>
            setFormData({ ...formData, property_name: text })
          }
          value={formData.property_name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          value={formData.description}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          value={formData.address}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Price per night"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) =>
            setFormData({ ...formData, price_per_night: text })
          }
          value={formData.price_per_night}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Max guests"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) =>
            setFormData({ ...formData, max_guests: text })
          }
          value={formData.max_guests}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Beds"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) => setFormData({ ...formData, beds: text })}
          value={formData.beds}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Bedrooms"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) => setFormData({ ...formData, bedrooms: text })}
          value={formData.bedrooms}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Size"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={(text) => setFormData({ ...formData, size: text })}
          value={formData.size}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddProperty');
        }}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.button_text}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyListScreen;
