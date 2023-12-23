import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import SearchBar from '../../components/SearchBar';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import AccomdtCard from '../../components/AccomdtCard';
import mockPropertyData from '../../constants/mock/mockPropertyData';

const PropertyListScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      />
      <View style={styles.list}>
        <FlatList
          data={mockPropertyData}
          renderItem={({ item }) => (
            <AccomdtCard
              data={item}
              onCardClicked={() =>
                navigation.navigate('PropertyDetail', { data: item })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddProperty');
        }}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.button_text}>Add new property</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyListScreen;
