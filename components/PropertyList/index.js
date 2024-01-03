import { useCallback, useContext, useEffect, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AccomdtCard from '../AccomdtCard';
import Loading from '../Loading';
import getAllProperties from '../../redux/features/properties/actions/getAllProperties';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import { getLocalData } from '../../utils/helper/user';

const PropertyList = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(ThemeContext);
  const error = useSelector((state) => state.property.error);
  const loading = useSelector((state) => state.property.loading);
  const data = useSelector((state) => state.property.properties);
  const navigation = useNavigation();
  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);
  const userId = useMemo(async () => await getLocalData('userId'), []);

  const fetchProperties = useCallback(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  useEffect(() => {
    fetchProperties();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchProperties();
    });

    return unsubscribe;
  }, [fetchProperties, navigation]);

  const handleCardClicked = (item) => {
    if (userId._j === item?.user_id) {
      return navigation.navigate('EditProperty', { data: item });
    }

    navigation.navigate('AccomdtDetail', { data: item });
  };

  console.log('User ID: ', userId);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No result</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
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

export default PropertyList;
