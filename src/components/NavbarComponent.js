import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles as styles } from '../Styles/globalStyles';

export default function NavbarComponent() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Aquí podrías borrar algún token o estado de sesión si lo implementas
    navigation.replace('Login');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Registros')}>
        <Text style={styles.navItem}>Registros</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Personas')}>
        <Text style={styles.navItem}>Personas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Consultas')}>
        <Text style={styles.navItem}>Consultas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.navItem}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
