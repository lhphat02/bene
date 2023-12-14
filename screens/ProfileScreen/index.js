import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View>
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
