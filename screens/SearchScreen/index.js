import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';

import SearchBar from '../../components/SearchBar';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import AccomdtCard from '../../components/AccomdtCard';
import mockHomeData from '../../constants/mock/mockHomeData';

const SearchScreen = () => {
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
          data={mockHomeData}
          renderItem={({ item }) => <AccomdtCard data={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
