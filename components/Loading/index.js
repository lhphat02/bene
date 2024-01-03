import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import theme from '../../constants/theme';

const Loading = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { colors, darkColors } = theme;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={isDarkMode ? darkColors.tertiary : colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
