import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import ModalComponent from './ModalComponent';

export default function ParentComponent() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addTask = () => {
    if (inputValue) {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
    closeModal();
  };

  return (
    <View>
      <Button title="Ajouter une tâche" onPress={openModal} />
      {tasks.map((task, index) => (
        <Text key={index}>{task}</Text>
      ))}
      <ModalComponent
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={addTask}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </View>
  );
}
