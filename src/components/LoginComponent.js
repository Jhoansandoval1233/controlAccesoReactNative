import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import InputField from './ui/InputField';
import Button from './ui/Button';
import Card from './ui/Card';
import AlertComponent from './AlertComponent';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AsyncStorage.getItem('authenticated');
      if (auth === 'true') {
        navigation.replace('Registros');
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({ show: true, type: 'danger', message: 'Todos los campos son obligatorios.' });
      return;
    }

    if (email === 'admin@sena.edu.co' && password === '1234') {
      await AsyncStorage.setItem('authenticated', 'true');
      navigation.replace('Registros');
    } else {
      setAlert({ show: true, type: 'danger', message: 'Credenciales incorrectas.' });
    }
  };

  return (
    <View style={styles.container}>
      <Card title="Iniciar sesión">
        {alert.show && <AlertComponent type={alert.type} message={alert.message} />}

        <InputField
          label="Correo electrónico"
          placeholder="correo@sena.edu.co"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Iniciar sesión" onPress={handleSubmit} />

        <View style={styles.links}>
          <TouchableOpacity onPress={() => Alert.alert('Olvidó contraseña')}>
            <Text style={styles.linkText}>¿Olvidó contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Registrarse')}>
            <Text style={styles.linkText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  links: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#007bff',
  },
});

export default LoginComponent;
