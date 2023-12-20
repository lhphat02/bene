import { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import getStyles from './styles';
import { ThemeContext } from '../../context/ThemeContext';
import Logo from '../../components/Logo';
import Divider from '../../components/Divider';
const RegisterScreen = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an account</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Account name"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm password"
          placeholderTextColor={isDarkMode ? 'white' : 'black'}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => alert('Login')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
