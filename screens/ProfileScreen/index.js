import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/features/auth/reducers/authSlice';
import { ThemeContext } from '../../context/ThemeContext';
import getStyles from './styles';

const ProfileScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const styles = getStyles(isDarkMode);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="person-circle-outline"
          size={120}
          color={isDarkMode ? 'white' : 'gray'}
        />
        <Text style={styles.header}>Username</Text>
      </View>
      <Button
        title="Go to Setting"
        color="gray"
        onPress={() => navigation.navigate('Setting')}
      />
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
