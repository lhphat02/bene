import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

const PropertyListScreen = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>PropertyListScreen</Text>
    </View>
  );
};

export default PropertyListScreen;
