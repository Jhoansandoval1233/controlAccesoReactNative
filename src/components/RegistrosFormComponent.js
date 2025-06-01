import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Switch,
  ScrollView,Alert,} from 'react-native';
import { commonStyles as styles } from '../Styles/globalStyles';
import NavbarComponent from '../components/NavbarComponent';


export default function RegistrosFormComponent() {
  const [documento, setDocumento] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('entrada');
  const [incluyeVehiculo, setIncluyeVehiculo] = useState(false);
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [incluyeElemento, setIncluyeElemento] = useState(false);
  const [tipoElemento, setTipoElemento] = useState('');
  const [serial, setSerial] = useState('');

  const handleSubmit = () => {
    if (!documento) {
      Alert.alert('Error', 'El documento es obligatorio.');
      return;
    }

    console.log({
      documento,
      tipoAcceso,
      incluyeVehiculo,
      tipoVehiculo,
      placaVehiculo,
      incluyeElemento,
      tipoElemento,
      serial,
    });

    Alert.alert('Éxito', 'Registro guardado exitosamente.');

    // Limpiar formulario
    setDocumento('');
    setTipoAcceso('entrada');
    setIncluyeVehiculo(false);
    setTipoVehiculo('');
    setPlacaVehiculo('');
    setIncluyeElemento(false);
    setTipoElemento('');
    setSerial('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulario de Registros</Text>

        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          value={documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
        />

        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              tipoAcceso === 'entrada' && styles.radioButtonSelected,
            ]}
            onPress={() => setTipoAcceso('entrada')}
          >
            <Text style={styles.radioText}>Entrada</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              tipoAcceso === 'salida' && styles.radioButtonSelected,
            ]}
            onPress={() => setTipoAcceso('salida')}
          >
            <Text style={styles.radioText}>Salida</Text>
          </TouchableOpacity>
        </View>

        {/* Vehículo */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Registrar vehículo</Text>
          <Switch value={incluyeVehiculo} onValueChange={setIncluyeVehiculo} />
        </View>

        {incluyeVehiculo && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Tipo de vehículo (automóvil, moto...)"
              value={tipoVehiculo}
              onChangeText={setTipoVehiculo}
            />
            <TextInput
              style={styles.input}
              placeholder="Placa del vehículo"
              value={placaVehiculo}
              onChangeText={setPlacaVehiculo}
            />
          </>
        )}

        {/* Elemento */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Registrar elemento</Text>
          <Switch value={incluyeElemento} onValueChange={setIncluyeElemento} />
        </View>

        {incluyeElemento && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Tipo de elemento (Ej: Portátil)"
              value={tipoElemento}
              onChangeText={setTipoElemento}
            />
            <TextInput
              style={styles.input}
              placeholder="Serial"
              value={serial}
              onChangeText={setSerial}
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar Registro</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavbarComponent />
    </View>
  );
}
