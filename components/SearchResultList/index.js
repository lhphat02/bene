import { useCallback, useContext, useEffect, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../context/ThemeContext';
import useDebounce from '../../hooks/useDebounce';
import AccomdtCard from '../AccomdtCard';
import Loading from '../Loading';
import getPropertyByKeyword from '../../redux/features/properties/actions/getPropertyByKeyword';
import useUserData from '../../hooks/useUser';
import getStyles from './styles';
import { useTranslation } from 'react-i18next';

const SearchResultList = ({ keyword }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(ThemeContext);

  const error = useSelector((state) => state.property.error);
  const loading = useSelector((state) => state.property.loading);
  const result = useSelector((state) => state.property.searchResult);

  const navigation = useNavigation();
  const debouncedKeyword = useDebounce(keyword, 1000);
  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);
  const { userData } = useUserData();
  const { t } = useTranslation();

  useEffect(() => {
    if (!debouncedKeyword) return;

    dispatch(getPropertyByKeyword(debouncedKeyword));
  }, [debouncedKeyword]);

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

  if (!keyword) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t('search.searchYourIdealHome')}</Text>
      </View>
    );
  }

  if (!result.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t('search.noResults')}</Text>
      </View>
    );
  }

  console.log('User data: ', userData._id);

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={result}
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

export default SearchResultList;
