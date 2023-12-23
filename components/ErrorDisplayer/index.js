import React from 'react';
import { View, Text } from 'react-native';

const ErrorDisplayer = ({ errorMessage }) => {
  const errorText = errorMessage;

  return (
    <View>
      <Text style={styles.errorText}>Error</Text>
    </View>
  );
};

const styles = {
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default ErrorDisplayer;
