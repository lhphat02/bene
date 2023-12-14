import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import LanguageSwitch from '../../components/LanguageSwitch';

const ProfileScreen = () => {
  const { t } = useTranslation();

  return (
    <View>
      <LanguageSwitch />
    </View>
  );
};

export default ProfileScreen;
