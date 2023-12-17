import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button } from 'react-native';

import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';

const ProfileScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text>{t('profile.title')}</Text>
      <Button
        title="Go to Setting"
        onPress={() => navigation.navigate('Setting')}
      >
        Setting
      </Button>
    </View>
  );
};

export default ProfileScreen;
