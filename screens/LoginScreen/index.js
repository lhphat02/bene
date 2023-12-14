import React, { useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const LoginScreen = () => {
  const { t } = useTranslation();
  const {
    theme: { colors },
    isDarkMode,
  } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode, colors);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <Button title="Login" />
    </View>
  );
};

export default LoginScreen;
