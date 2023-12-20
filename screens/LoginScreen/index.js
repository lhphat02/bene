import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import Logo from '../../components/Logo';
import Divider from '../../components/Divider';
import login, { loginStatic } from '../../redux/features/auth/actions/login';
import { loginSuccess } from '../../redux/features/auth/reducers/authSlice';

const LoginScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigator = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  console.log('user', user);

  const styles = getStyles(isDarkMode);

  const handleLogin = () => {
    // dispatch(loginSuccess({ username: 'admin', token: '123' }));
    dispatch(login({ username: 'quantest1', password: 'a' }));
  };

  return (
    <View style={styles.container}>
      <Logo width={120} height={120} />
      {/* <Text style={styles.header}>Login</Text> */}
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Divider
        dividerText="Don't have an account?"
        color={isDarkMode ? 'white' : 'black'}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
        // onPress={() => console.log('user&token', user, token)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
