import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import SearchBar from '../../components/SearchBar';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const SearchScreen = ({ navigation }) => {
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
      <Text style={styles.text}>No result</Text>
    </View>
  );
};

export default SearchScreen;
