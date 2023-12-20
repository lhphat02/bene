import { TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';
import theme from '../../constants/theme';

const { colors } = theme;

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color={isDarkMode ? 'black' : 'white'}
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={isDarkMode ? 'black' : 'white'}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && searchPhrase ? (
          <Entypo
            name="cross"
            size={20}
            color={isDarkMode ? 'black' : 'white'}
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        ) : null}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            color={colors.primary}
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;
