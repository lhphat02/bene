import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import i18n from 'i18next';

import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const LanguageSwitch = () => {
  const {
    theme: { colors },
    isDarkMode,
  } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode, colors);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Language</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('en')}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('vi')}
      >
        <Text style={styles.buttonText}>Vietnamese</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitch;
