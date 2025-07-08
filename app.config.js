import 'dotenv/config';

export default {
  expo: {
    name: 'ControlAcceso',
    slug: 'control-acceso',
    version: '1.0.0',
    android: {
      package: 'com.sandoval123.controlacceso'
    },
    extra: {
      LOCAL_IP: process.env.LOCAL_IP || "192.168.57.246",
      PORT: process.env.PORT || "4000",
      PROD_API_URL: process.env.PROD_API_URL || "http://192.168.57.246:4000/api"
    }
  }
};
