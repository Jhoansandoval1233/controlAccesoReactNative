import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { commonStyles as styles } from '../Styles/globalStyles';
import NavbarComponent from '../components/NavbarComponent';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Constants from 'expo-constants';

const extra = Constants?.expoConfig?.extra || Constants?.manifest?.extra || {};
const { LOCAL_IP, PORT, PROD_API_URL } = extra;
const API_URL = `${PROD_API_URL}/api/control_acceso`;

export default function RegistrosScreen() {
  const [documento, setDocumento] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('entrada');
  const [incluyeVehiculo, setIncluyeVehiculo] = useState(false);
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [incluyeElemento, setIncluyeElemento] = useState(false);
  const [tipoElemento, setTipoElemento] = useState('');
  const [serial, setSerial] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!documento.trim()) {
      Alert.alert('Error', 'El número de documento es obligatorio');
      return;
    }
    if (!tipoAcceso) {
      Alert.alert('Error', 'Seleccione un tipo de acceso');
      return;
    }
    if (incluyeVehiculo && (!tipoVehiculo || !placaVehiculo.trim())) {
      Alert.alert('Error', 'Complete los datos del vehículo');
      return;
    }
    if (incluyeElemento && (!tipoElemento || !serial.trim())) {
      Alert.alert('Error', 'Complete los datos del elemento');
      return;
    }
  
    const registroData = {
      documento,
      tipo_movimiento: tipoAcceso,
      vehiculo: incluyeVehiculo
        ? { 
            placa: placaVehiculo, 
            tipo_vehiculo: tipoVehiculo 
          }
        : null,
      elemento: incluyeElemento
        ? { 
            serial: serial, 
            tipo_elemento: tipoElemento 
          }
        : null,
    };
  
    setLoading(true);
  
    try {
      console.log('Enviando POST a:', API_URL);
      console.log('Payload:', registroData);
      
      const response = await axios.post(API_URL, registroData); 
      console.log('Respuesta del servidor:', response.data);
  
      if (response.data.success) {
        Alert.alert('Éxito', 'Registro guardado exitosamente');
  
        // Limpiar formulario
        setDocumento('');
        setTipoAcceso('entrada');
        setIncluyeVehiculo(false);
        setTipoVehiculo('');
        setPlacaVehiculo('');
        setIncluyeElemento(false);
        setTipoElemento('');
        setSerial('');
      } else {
        Alert.alert('Error', response.data.message || 'Error al guardar registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Error al guardar registro'
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          value={documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
          placeholderTextColor="#999"
          editable={!loading}
        />

        <Text style={styles.label}>Tipo de Acceso:</Text>
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={tipoAcceso === 'entrada'}
              onValueChange={() => setTipoAcceso('entrada')}
              disabled={loading}
            />
            <Text style={styles.checkboxLabel}>Entrada</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={tipoAcceso === 'salida'}
              onValueChange={() => setTipoAcceso('salida')}
              disabled={loading}
            />
            <Text style={styles.checkboxLabel}>Salida</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text style={styles.label}>¿Registrar vehículo?</Text>
          <Switch
            value={incluyeVehiculo}
            onValueChange={setIncluyeVehiculo}
            disabled={loading}
            style={{ marginLeft: 10 }}
          />
        </View>

        {incluyeVehiculo && (
          <>
            <Text style={styles.label}>Tipo de Vehículo</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={tipoVehiculo}
                onValueChange={setTipoVehiculo}
                enabled={!loading}
                dropdownIconColor="#000"
              >
                <Picker.Item label="Seleccione un tipo..." value="" />
                <Picker.Item label="Automóvil" value="automovil" />
                <Picker.Item label="Motocicleta" value="motocicleta" />
                <Picker.Item label="Camioneta" value="camioneta" />
                <Picker.Item label="Otro" value="otro" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Placa del Vehículo"
              value={placaVehiculo}
              onChangeText={setPlacaVehiculo}
              placeholderTextColor="#999"
              editable={!loading}
            />
          </>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text style={styles.label}>¿Registrar elemento?</Text>
          <Switch
            value={incluyeElemento}
            onValueChange={setIncluyeElemento}
            disabled={loading}
            style={{ marginLeft: 10 }}
          />
        </View>

        {incluyeElemento && (
          <>
            <Text style={styles.label}>Tipo de Elemento</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={tipoElemento}
                onValueChange={setTipoElemento}
                enabled={!loading}
                dropdownIconColor="#000"
              >
                <Picker.Item label="Seleccione un tipo..." value="" />
                <Picker.Item label="Computador" value="computador" />
                <Picker.Item label="Tablet" value="tablet" />
                <Picker.Item label="Proyector" value="proyector" />
                <Picker.Item label="Otro" value="otro" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Serial del Elemento"
              value={serial}
              onChangeText={setSerial}
              placeholderTextColor="#999"
              editable={!loading}
            />
          </>
        )}

        <TouchableOpacity
          style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'Guardar Registro'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavbarComponent />
    </View>
  );
}
