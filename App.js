import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const toggleFavorite = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isFavorite: !updatedTasks[index].isFavorite,
    };
    setTasks(updatedTasks);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openEditModal = (index) => {
    setSelectedIndex(index);
    setSelectedTask(tasks[index]);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const addTask = () => {
    if (inputValue) {
      setTasks([...tasks, { text: inputValue, updatedAt: new Date(), isFavorite: false }]);
      setInputValue('');
    }
    closeModal();
  };

  const deleteTask = () => {
    if (deleteTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(deleteTaskIndex, 1);
      setTasks(updatedTasks);
      setDeleteTaskIndex(null);
      setDeleteModalVisible(false);
    }
  };

  const saveEditedTask = () => {
    if (selectedIndex !== null && selectedTask) {
      const updatedTasks = [...tasks];
      updatedTasks[selectedIndex] = { ...selectedTask, updatedAt: new Date() };
      setTasks(updatedTasks);
      setSelectedIndex(null);
      setSelectedTask(null);
      closeEditModal();
    }
  };

  const filteredTasks = showFavorites
    ? tasks.filter((task) => task.isFavorite)
    : tasks;

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { textAlign: 'center', marginTop: 40 }]}>
        
      </Text>
      <Button
        title={showFavorites ? 'Voir toutes les tâches' : 'Voir les favoris'}
        onPress={() => setShowFavorites(!showFavorites)}
      />
      <FlatList
        style={{ marginTop: 20 }}
        data={filteredTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => openEditModal(index)}
            onLongPress={() => {
              setDeleteTaskIndex(index);
              setDeleteModalVisible(true);
            }}
          >
            <View style={styles.taskBlock}>
              <TouchableOpacity
                onPress={() => toggleFavorite(index)}
                style={[
                  styles.favoriteIcon,
                  {
                    backgroundColor: item.isFavorite ? 'gold' : 'lightgray',
                  },
                ]}
              >
                <Text style={{ color: 'white' }}>★</Text>
              </TouchableOpacity>
              <Text style={styles.taskText}>{item.text}</Text>
              {item.updatedAt && (
                <Text style={styles.dateText}>
                  {item.updatedAt.toLocaleString()}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Ajouter une tâche" onPress={openModal} color="green" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={[
              styles.input,
              { width: '100%', height: 600, textAlignVertical: 'top' },
            ]}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            placeholder="Saisissez une tâche"
          />
          <View style={styles.buttonContainer}>
            <Button title="Soumettre" onPress={addTask} color="green" />
            <Button title="Fermer" onPress={closeModal} color="red" />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={[
              styles.input,
              { width: '100%', height: 600, textAlignVertical: 'top' },
            ]}
            onChangeText={(text) => setSelectedTask({ ...selectedTask, text })}
            value={selectedTask?.text || ''}
          />
          <View style={styles.buttonContainer}>
            <Button title="Enregistrer" onPress={saveEditedTask} />
            <Button
              title="Supprimer"
              onPress={() => {
                setDeleteTaskIndex(selectedIndex);
                setDeleteModalVisible(true);
              }}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Voulez-vous supprimer cette tâche ?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Annuler" onPress={() => setDeleteModalVisible(false)} color="blue" />
            <Button title="Supprimer" onPress={deleteTask} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskBlock: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
  },
  dateText: {
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  favoriteIcon: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
