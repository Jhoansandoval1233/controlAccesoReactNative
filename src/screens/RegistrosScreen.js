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
        <Text style={styles.title}>Formulario de Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          value={documento}
          onChangeText={setDocumento}
          keyboardType="numeric"
          placeholderTextColor={styles.placeholderColor}
        />

        <Text style={styles.label}>Tipo de Acceso:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            onPress={() => setTipoAcceso('entrada')}
            style={[
              styles.radioOption,
              tipoAcceso === 'entrada' && styles.radioOptionSelected,
            ]}
          >
            <View
              style={[
                styles.radioCircle,
                tipoAcceso === 'entrada' && styles.radioCircleSelected,
              ]}
            />
            <Text style={styles.radioText}>Entrada</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTipoAcceso('salida')}
            style={[
              styles.radioOption,
              tipoAcceso === 'salida' && styles.radioOptionSelected,
            ]}
          >
            <View
              style={[
                styles.radioCircle,
                tipoAcceso === 'salida' && styles.radioCircleSelected,
              ]}
            />
            <Text style={styles.radioText}>Salida</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Registrar vehículo?</Text>
          <Switch value={incluyeVehiculo} onValueChange={setIncluyeVehiculo} />
        </View>

        {incluyeVehiculo && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Vehículo (Ej: automóvil)"
              value={tipoVehiculo}
              onChangeText={setTipoVehiculo}
              placeholderTextColor={styles.placeholderColor}
            />
            <TextInput
              style={styles.input}
              placeholder="Placa del Vehículo"
              value={placaVehiculo}
              onChangeText={setPlacaVehiculo}
              placeholderTextColor={styles.placeholderColor}
            />
          </>
        )}

        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Registrar elemento?</Text>
          <Switch value={incluyeElemento} onValueChange={setIncluyeElemento} />
        </View>

        {incluyeElemento && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Elemento"
              value={tipoElemento}
              onChangeText={setTipoElemento}
              placeholderTextColor={styles.placeholderColor}
            />
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
