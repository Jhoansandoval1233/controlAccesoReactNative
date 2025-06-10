import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../Styles/globalStyles'; // Ajusta la ruta

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await AsyncStorage.getItem('authenticated');
      if (isAuthenticated === 'true') {
        navigation.navigate('Registros');
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://192.168.77.246:4000/api/usuario/login', {
        email,
        password
      });

      if (response.data.success) {
        await AsyncStorage.setItem('authenticated', 'true');
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));

        Alert.alert('Éxito', 'Login exitoso. Redirigiendo...');
        setTimeout(() => {
          navigation.navigate('Registros');
        }, 1000);
      }

    } catch (error) {
      console.error('Error de login:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Iniciar Sesión</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
        placeholderTextColor="#999"
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        placeholderTextColor="#999"
      />

      <TouchableOpacity 
        style={commonStyles.button} 
        onPress={handleSubmit} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={commonStyles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        marginTop: 20 
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: commonStyles.button.backgroundColor, textDecorationLine: 'underline' }}>
            ¿Olvidó contraseña?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: commonStyles.button.backgroundColor, textDecorationLine: 'underline' }}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginComponent;
