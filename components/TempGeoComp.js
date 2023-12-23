import React from 'react';
import { View, Text } from 'react-native';
import useLocation from '../hooks/useLocation';

const TempGeoComp = () => {
  const { location, error } = useLocation();

  console.log('location: ', location);

  return (
    <View>
      {error ? (
        <Text>Error: {error}</Text>
      ) : location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude:{' '}
          {location.coords.longitude}
        </Text>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

export default TempGeoComp;
