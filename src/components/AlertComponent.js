import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertComponent = ({ type, message }) => {
  const styles = getStyles(type);
  return (
    <View style={styles.alert}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const getStyles = (type) => {
  const isError = type === 'danger';
  return StyleSheet.create({
    alert: {
      padding: 10,
      borderRadius: 6,
      marginBottom: 12,
      backgroundColor: isError ? '#f8d7da' : '#d1e7dd',
      borderLeftWidth: 4,
      borderLeftColor: isError ? '#D32F2F' : '#00A67C', // Verde claro o rojo
    },
    text: {
      color: isError ? '#842029' : '#0f5132',
      fontWeight: '500',
    },
  });
};

export default AlertComponent;
