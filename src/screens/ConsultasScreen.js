import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles, colors, globalStyles } from '../Styles/globalStyles';

const ConsultasScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Campo vacío', 'Por favor ingrese la cédula o documento.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://localhost:4000/api/persona/documento/' + searchQuery, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Respuesta del servidor:", response.data);

      if (response.data && response.data.persona) {
        console.log("Persona encontrada:", response.data.persona);
        setResultados([response.data.persona]);
      } else {
        setResultados([]);
        Alert.alert('Sin resultados', 'No se encontró ninguna persona con ese documento.');
      }

    } catch (error) {
      console.error('Error al consultar registros:', error);
      Alert.alert('Error', 'No se pudieron obtener los registros.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{item.nombre} {item.apellido}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Documento:</Text>
        <Text style={styles.value}>{item.tipo_documento} {item.numero_documento}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{item.telefono}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{item.correo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{item.tipo_rol}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Fecha Registro:</Text>
        <Text style={styles.value}>{new Date(item.fecha_registro).toLocaleString()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Activo:</Text>
        <Text style={styles.value}>{item.activo ? 'Sí' : 'No'}</Text>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Consultar Registros</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Ingrese número de documento"
        value={searchQuery}
        onChangeText={setSearchQuery}
        keyboardType="numeric"
        placeholderTextColor={colors.placeholderGray}
      />

      <TouchableOpacity style={commonStyles.button} onPress={handleSearch} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={commonStyles.buttonText}>Buscar</Text>}
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={colors.secondaryOrange} style={{ marginTop: 20 }} />}

      {!loading && resultados.length === 0 && (
        <Text style={styles.noResults}>No se encontraron resultados</Text>
      )}

      <FlatList
        data={resultados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

export default ConsultasScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.FlatList,
    padding: 40,
    borderRadius: globalStyles.borderRadius,
    marginBottom: 16,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: colors.white,
    width: 330,
    fontSize: 16,
  },
  value: {
    color: colors.white,
    fontSize: 16,
    flexShrink: 1,
  },
  noResults: {
    marginTop: 20,
    color: colors.placeholderGray,
    fontSize: 16,
    textAlign: 'center',
  },
});
