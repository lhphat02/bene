import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

const SearchScreen = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;
