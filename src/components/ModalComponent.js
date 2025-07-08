import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { commonStyles as styles, commonStyles as globalStyles } from '../Styles/globalStyles';

export default function ModalComponent({ visible, onClose, message }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={commonStyles.modalOverlay}>
        <View style={commonStyles.modalContent}>
          <Text style={commonStyles.modalText}>{message}</Text>

          <TouchableOpacity style={commonStyles.closeButton} onPress={onClose}>
            <Text style={commonStyles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}