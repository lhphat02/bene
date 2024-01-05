import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return { location, error, loading };
};

export default useLocation;
