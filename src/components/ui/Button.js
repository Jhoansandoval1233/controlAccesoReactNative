import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === 'primary' ? styles.primary : styles.secondary]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  primary: {
    backgroundColor: '#007256', // Verde SENA
  },
  secondary: {
    backgroundColor: '#6c757d',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default Button;
