import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import TempGeoComp from '../../components/TempGeoComp';

const NotificationScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Noti Screen</Text>
      <TempGeoComp />
    </View>
  );
};

export default NotificationScreen;
