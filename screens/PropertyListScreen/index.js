import { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ThemeContext } from '../../context/ThemeContext';
import HostPropertyList from '../../components/HostPropertyList';
import getStyles from './styles';

const PropertyListScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <HostPropertyList />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddProperty')}
      >
        <Ionicons name="add" size={24} color="white" />

        <Text style={styles.button_text}>Create new property</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyListScreen;
