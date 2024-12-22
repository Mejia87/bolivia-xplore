import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterButton = ({ onApplyFilters }) => {
  //console.log(distancia)
  const [modalVisible, setModalVisible] = useState(false);
  
  const [selectedOptions, setSelectedOptions] = useState({
    distancia: 0.0,
    favorites: false,
    active: false,
  });
  const [initialOptions, setInitialOptions] = useState(selectedOptions);
  const [distance, setDistance] = useState('');

  const toggleOption = (option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  const applyFilters = () => {
    onApplyFilters({ ...selectedOptions, distance });
    setModalVisible(false);
  };

  const openModal = () => {
    setInitialOptions(selectedOptions);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOptions(initialOptions);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.button}>
        <Icon name="options-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Filtro</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={closeModal}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <Text style={styles.modalTitle}>Selecciona opciones</Text>

            <View style={styles.optionButton}>
              <Text style={styles.optionText}>Distancia (km)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={distance}
                onChangeText={setDistance}
                placeholder="numero"
                placeholderTextColor="#ccc"
              />
            </View>

            {['favorites', 'active'].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => toggleOption(option)}
              >
                <Icon
                  name={
                    selectedOptions[option]
                      ? 'checkbox-outline'
                      : 'square-outline'
                  }
                  size={20}
                  color="white"
                />
                <Text style={styles.optionText}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
           
           {/* <TouchableOpacity
              style={styles.closeButton}
              onPress={applyFilters}
            >
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>*/}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 100,
    padding: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: 'rgba(10, 36, 58, 0.81)',
    borderRadius: 10,
    alignItems: 'flex-start',
    marginTop: 80,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 80,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default FilterButton;
