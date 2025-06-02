import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { commonStyles } from '../Styles/globalStyles';

const registrosEjemplo = [
  { identidad: '12345678', fecha: '2024-05-01', entrada: '08:00', salida: '17:00', persona: 'Juan Pérez', cargo: 'Vigilante', observaciones: 'Sin novedades' },
  { identidad: '87654321', fecha: '2024-05-02', entrada: '09:00', salida: '18:00', persona: 'Ana Gómez', cargo: 'Administrador', observaciones: '' },
];

const ConsultasScreen = () => {
  const [searchIdentidad, setSearchIdentidad] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!searchIdentidad.trim()) {
      setResults([]); // No buscar si el campo está vacío
      return;
    }
    const filtrados = registrosEjemplo.filter(reg => reg.identidad.includes(searchIdentidad));
    setResults(filtrados);
  };

  const renderItem = ({ item }) => (
    <View style={[commonStyles.input, { padding: 10, borderRadius: 8, backgroundColor: '#f4f4f4', marginBottom: 10 }]}>
      <Text style={{ fontWeight: 'bold' }}>Identidad: {item.identidad}</Text>
      <Text>Fecha: {item.fecha}</Text>
      <Text>Entrada: {item.entrada}</Text>
      <Text>Salida: {item.salida}</Text>
      <Text>Persona: {item.persona}</Text>
      <Text>Cargo: {item.cargo}</Text>
      <Text>Observaciones: {item.observaciones || '-'}</Text>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Consultar Registros</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Buscar por número de identidad..."
        placeholderTextColor="#777"
        value={searchIdentidad}
        onChangeText={setSearchIdentidad}
        keyboardType="numeric"
      />

      <TouchableOpacity style={commonStyles.button} onPress={handleSearch}>
        <Text style={commonStyles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item) => item.identidad}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: '#555', marginTop: 20 }}>No se encontraron registros</Text>}
        style={{ marginTop: 20, width: '100%' }}
      />
    </View>
  );
};

export default ConsultasScreen;
