// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../components/LanguageSwitch/LanguageSwitch';
import styles from './styles';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home.welcomeMessage')}</Text>
      {/* Add your home screen content here */}
      <LanguageSwitch />
    </View>
  );
};

export default HomeScreen;
