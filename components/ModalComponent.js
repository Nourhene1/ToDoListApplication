import React from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet } from 'react-native';

export default function ModalComponent({ isVisible, onClose, onSubmit, inputValue, setInputValue }) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
        <View style={styles.buttonContainer}>
          <Button title="Soumettre" onPress={handleSubmit} />
          <Button title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
  },
});
