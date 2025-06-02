import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegistrosScreen from './src/screens/RegistrosScreen';
import PersonasScreen from './src/screens/PersonasScreen';
import ConsultasScreen from './src/screens/ConsultasScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#007256" barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#007256' }, // Verde institucional
          headerTintColor: '#ffffff', // Texto blanco
          contentStyle: { backgroundColor: '#F5F5F5' }, // Fondo claro institucional
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="Registros" component={RegistrosScreen} options={{ title: 'Registros' }} />
        <Stack.Screen name="Personas" component={PersonasScreen} options={{ title: 'Personas' }} />
        <Stack.Screen name="Consultas" component={ConsultasScreen} options={{ title: 'Consultas' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
