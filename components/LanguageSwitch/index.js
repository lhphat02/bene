import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const LanguageSwitch = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.language')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('en')}
      >
        <Text style={styles.buttonText}>{t('settings.english')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('vi')}
      >
        <Text style={styles.buttonText}>{t('settings.vietnamese')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitch;
