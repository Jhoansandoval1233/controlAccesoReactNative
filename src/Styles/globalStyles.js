import { StyleSheet } from 'react-native';

export const colors = {
  primaryGreen: '#007256',    // verde institucional SENA
  secondaryOrange: '#F78F1E', // naranja institucional SENA
  white: '#FFFFFF',
  placeholderGray: '#999999',
  textDark: '#333333',
  backgroundLight: '#F5F5F5',
};

export const globalStyles = {
  paddingHorizontal: 25,
  borderRadius: 12,
  fontSizeTitle: 28,
  fontSizeInput: 16,
  fontSizeButtonText: 18,
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: globalStyles.paddingHorizontal,
  },
  title: {
    fontSize: globalStyles.fontSizeTitle,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: globalStyles.borderRadius,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: globalStyles.fontSizeInput,
    marginBottom: 20,
    color: colors.textDark,
  },
  button: {
    width: '100%',
    backgroundColor: colors.secondaryOrange,
    paddingVertical: 15,
    borderRadius: globalStyles.borderRadius,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: globalStyles.fontSizeButtonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundLight: {
    backgroundColor: colors.backgroundLight,
  },

  navbar: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 10,
  backgroundColor: '#009C3B', // Verde SENA
},

navItem: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

checkboxGroup: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10,
},

checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20,
},

checkboxLabel: {
  marginLeft: 8,
  fontSize: 16,
  color: '#333',
},

label: {
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 20,
  color: '#333',
},

  picker: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: globalStyles.borderRadius,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 20,
    color: colors.textDark,
    borderWidth: 0,
    overflow: 'hidden',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: globalStyles.borderRadius,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.textDark,
  },
  closeButton: {
    width: '100%',
    backgroundColor: colors.secondaryOrange,
    paddingVertical: 12,
    borderRadius: globalStyles.borderRadius,
  },
});
