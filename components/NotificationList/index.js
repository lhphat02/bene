import { useCallback, useContext, useEffect, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Loading from '../Loading';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import { getLocalData } from '../../utils/helper/user';
import NotiTab from '../NotificationTab';
import getUserNotification from '../../redux/features/notifications/actions/getUserNotification';

const NotificationList = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(ThemeContext);

  const error = useSelector((state) => state.notification.error);
  const loading = useSelector((state) => state.notification.loading);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const reversedNotifications = useMemo(
    () => [...notifications].reverse(),
    [notifications]
  );

  const navigation = useNavigation();
  const styles = useMemo(() => getStyles(isDarkMode), [isDarkMode]);

  const fetchNotification = useCallback(async () => {
    const userId = await getLocalData('userId');
    dispatch(getUserNotification(userId));
  }, [dispatch]);

  useEffect(() => {
    fetchNotification();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotification();
    });

    return unsubscribe;
  }, [fetchNotification]);

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

  if (!notifications.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You don't have any notification</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={reversedNotifications}
        renderItem={({ item }) => <NotiTab data={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default NotificationList;
