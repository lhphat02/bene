import React, { useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import Logo from '../../components/Logo';
import Divider from '../../components/Divider';

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

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
      <TouchableOpacity style={styles.button} onPress={() => alert('Login')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Divider dividerText="Or" />

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
