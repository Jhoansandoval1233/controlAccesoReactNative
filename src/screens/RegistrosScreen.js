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
import { commonStyles as styles, commonStyles as globalStyles } from '../Styles/globalStyles';
import NavbarComponent from '../components/NavbarComponent';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';


export default function RegistrosScreen() {
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
      Alert.alert('Error', 'El número de documento es obligatorio');
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

    Alert.alert('Éxito', 'Registro guardado exitosamente');

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
        <Text style={styles.title}>Formulario de Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          value={documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
          placeholderTextColor={styles.placeholderColor}
        />

        <Text style={globalStyles.label}>Tipo de Acceso:</Text>

        <View style={globalStyles.checkboxGroup}>
          <View style={globalStyles.checkboxContainer}>
            <CheckBox
              value={tipoAcceso === 'entrada'}
              onValueChange={() =>
                setTipoAcceso(tipoAcceso === 'entrada' ? null : 'entrada')
              }
            />
            <Text style={globalStyles.checkboxLabel}>Entrada</Text>
          </View>

          <View style={globalStyles.checkboxContainer}>
            <CheckBox
              value={tipoAcceso === 'salida'}
              onValueChange={() =>
                setTipoAcceso(tipoAcceso === 'salida' ? null : 'salida')
              }
            />
            <Text style={globalStyles.checkboxLabel}>Salida</Text>
          </View>
        </View>

        {/* Switch Vehículo */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Registrar vehículo?</Text>
          <Switch value={incluyeVehiculo} onValueChange={setIncluyeVehiculo} />
        </View>

        {incluyeVehiculo && (
          <>
            <Text style={styles.label}>Tipo de Vehículo</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={tipoVehiculo}
                onValueChange={(itemValue) => setTipoVehiculo(itemValue)}
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
              placeholderTextColor={styles.placeholderColor}
            />
          </>
        )}

        {/* Switch Elemento */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Registrar elemento?</Text>
          <Switch value={incluyeElemento} onValueChange={setIncluyeElemento} />
        </View>

        {incluyeElemento && (
          <>
            <Text style={styles.label}>Tipo de Elemento</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={tipoElemento}
                onValueChange={(itemValue) => setTipoElemento(itemValue)}
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
              placeholderTextColor={styles.placeholderColor}
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
