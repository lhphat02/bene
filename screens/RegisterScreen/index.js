import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../../context/ThemeContext';
import register from '../../redux/features/auth/actions/register';
import getStyles from './styles';

const formContent = [
  {
    name: 'username',
    placeholder: 'Username',
  },
  {
    name: 'email',
    placeholder: 'Email',
  },
  {
    name: 'phoneNumber',
    placeholder: 'Phone number',
  },
  {
    name: 'accountName',
    placeholder: 'Account name',
  },
  {
    name: 'password',
    placeholder: 'Password',
  },
  // {
  //   name: 'confirmPassword',
  //   placeholder: 'Confirm password',
  // },
];

const RegisterScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(ThemeContext);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const styles = getStyles(isDarkMode);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    accountName: '',
    password: '',
    // confirmPassword: '',
  });

  const handleInputChange = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handeRegister = async () => {
    try {
      const { username, email, phoneNumber, accountName, password } = formData;

      if (!username || !email || !phoneNumber || !accountName || !password) {
        alert('Please fill in all fields');
        return;
      }

      dispatch(register(formData));

      if (error) {
        alert(error);
        return;
      }

      if (!loading && !error) {
        alert('Register successfully');

        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an account</Text>
      <KeyboardAvoidingView
        style={styles.form}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -40}
      >
        {formContent.map((item) => (
          <TextInput
            key={item.name}
            style={styles.textInput}
            placeholder={t(item.placeholder)}
            placeholderTextColor={isDarkMode ? 'white' : 'gray'}
            onChangeText={handleInputChange(item.name)}
          />
        ))}
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={handeRegister}
      >
        {loading && <ActivityIndicator size="small" color="white" />}
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
