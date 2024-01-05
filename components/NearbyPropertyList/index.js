import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AccomdtCard from '../AccomdtCard';
import Loading from '../Loading';
import getAllProperties from '../../redux/features/properties/actions/getAllProperties';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import { getLocalData } from '../../utils/helper/user';
import useLocation from '../../hooks/useLocation';
import { getTop5NearestLocations } from '../../utils/helper/location';

const NearbyPropertyList = () => {
  const dispatch = useDispatch();
  const { location, locationError, locationLoading } = useLocation();
  const { isDarkMode } = useContext(ThemeContext);
  const error = useSelector((state) => state.property.error);
  const loading = useSelector((state) => state.property.loading);
  const data = useSelector((state) => state.property.properties);
  const navigation = useNavigation();
  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);
  const userId = useMemo(async () => await getLocalData('userId'), []);
  const [nearbyProperties, setNearbyProperties] = useState([]);

  const fetchProperties = useCallback(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  // Fetch properties and update nearbyProperties when location and data are available
  useEffect(() => {
    const fetchData = async () => {
      fetchProperties();

      // Check if both location and data are available
      if (location?.coords?.latitude && location?.coords?.longitude && data) {
        const properties = getTop5NearestLocations(
          location.coords.latitude,
          location.coords.longitude,
          data
        );

        setNearbyProperties(properties);
      }
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [fetchProperties, location, navigation]);

  if (loading && locationLoading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (error || locationError) {
    return (
      <View style={styles.container}>
        {error ? (
          <Text style={styles.text}>{error.message}</Text>
        ) : (
          <Text style={styles.text}>{locationError}</Text>
        )}
      </View>
    );
  }

  if (!nearbyProperties?.length || !nearbyProperties) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={nearbyProperties}
        renderItem={({ item }) => (
          <AccomdtCard
            data={item}
            onCardClicked={() => {
              if (userId._j === item?.user_id) {
                return navigation.navigate('AccomdtTopTab', {
                  screen: 'PropertyStack',
                  params: {
                    screen: 'PropertyDetail',
                    params: {
                      data: item,
                    },
                  },
                });
              }

              navigation.navigate('AccomdtTopTab', {
                screen: 'AccomdtStack',
                params: {
                  screen: 'AccomdtDetail',
                  params: {
                    data: item,
                  },
                },
              });
            }}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default NearbyPropertyList;
