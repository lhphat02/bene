import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import SearchBar from '../../components/SearchBar';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

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
    </View>
  );
};

export default SearchScreen;
