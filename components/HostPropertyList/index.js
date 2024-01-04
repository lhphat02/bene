import { useCallback, useContext, useEffect, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../context/ThemeContext';
import useDebounce from '../../hooks/useDebounce';
import AccomdtCard from '../AccomdtCard';
import Loading from '../Loading';
import getPropertyByUserId from '../../redux/features/properties/actions/getPropertyByUserId';
import useUserData from '../../hooks/useUser';
import getStyles from './styles';

const HostPropertyList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userData } = useUserData();
  const { isDarkMode } = useContext(ThemeContext);

  const error = useSelector((state) => state.property.error);
  const loading = useSelector((state) => state.property.loading);
  const hostProperties = useSelector((state) => state.property.ownedProperties);

  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const fetchProperties = useCallback(() => {
    dispatch(getPropertyByUserId(userData?._id));
  }, [dispatch, userData]);

  useEffect(() => {
    if (!userData) return;

    fetchProperties();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchProperties();
    });

    return unsubscribe;
  }, [userData, fetchProperties]);

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

  if (!hostProperties.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No property available</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={hostProperties}
        renderItem={({ item }) => (
          <AccomdtCard
            data={item}
            onCardClicked={() => {
              if (userData._id === item.user_id) {
                navigation.navigate('PropertyDetail', { data: item });
              } else {
                navigation.navigate('AccomdtDetail', { data: item });
              }
            }}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default HostPropertyList;
