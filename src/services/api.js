import axios from 'axios';
import { Platform } from 'react-native';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'web') {
      return 'http://localhost:4000/api'; // Para navegador
    }

    if (Platform.OS === 'android') {
      return 'http://192.168.101.103:4000/api'; // Para móvil físico o emulador
    }

    return 'http://192.168.101.103:4000/api';
  } else {
    // ⚠️ Aquí también debe apuntar a tu IP local mientras no tengas dominio público
    return 'http://192.168.101.103:4000/api'; 
  }
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 5000,
});

export default api;
