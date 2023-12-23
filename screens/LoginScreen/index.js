import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import Logo from '../../components/Logo';
import Divider from '../../components/Divider';
import login from '../../redux/features/auth/actions/login';

const LoginScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const styles = getStyles(isDarkMode);

  const handleInputChange = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleLogin = () => {
    const { username, password } = formData;

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(login(formData));
  };

  if (error) {
    alert(error);
  }

  return (
    <View style={styles.container}>
      <Logo width={120} height={120} />
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={handleInputChange('username')}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
          onChangeText={handleInputChange('password')}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={handleLogin}
      >
        {loading && <ActivityIndicator size="small" color="white" />}
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Divider
        dividerText="Don't have an account?"
        color={isDarkMode ? 'white' : 'black'}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
