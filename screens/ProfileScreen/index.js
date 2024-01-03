import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import logout from '../../redux/features/auth/actions/logout';
import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';
import useUserData from '../../hooks/useUser';

const ProfileScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { userData, error, loading } = useUserData();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const styles = getStyles(isDarkMode);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(logout());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper_section}>
        <View style={styles.profile_avatar}>
          <Ionicons
            name="person-circle-outline"
            size={120}
            color={isDarkMode ? 'white' : 'gray'}
          />
          <Text style={styles.header}>{userData?.displayName}</Text>
        </View>

        <View style={styles.profile_detail}>
          <Text style={styles.text}>Username: {userData?.username}</Text>
          <Text style={styles.text}>Email: {userData?.email}</Text>
          <Text style={styles.text}>Phone: {userData?.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.button_group}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Setting')}
        >
          <Text style={styles.buttonText}>Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
