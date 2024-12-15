import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, Pressable, Alert, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import { API_BASE_URL } from '@env';


console.log(API_BASE_URL);

const Eventos = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openFilters = () => setModalVisible(true);
  const closeFilters = () => setModalVisible(false);

  const handleFilterByName = () => {
    console.log('Filtrar por nombre');
    closeFilters();
  };

  const handleFilterByDate = () => {
    console.log('Filtrar por fecha');
    closeFilters();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container1}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar evento"
            placeholderTextColor="gray"
          />
          <TouchableOpacity style={styles.filterButton} onPress={openFilters}>
            <Icon name="filter" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Pressable onPress={() => navigation.navigate('evento')}>
            <Image source={require('../../assets/celebracionFolklorica.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Celebraciones Folklóricas</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.item}>
          <Pressable onPress={() => Alert.alert('abrir evento')}>
            <Image source={require('../../assets/feriaTradicional.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Ferias Tradicionales</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.item}>
          <Pressable onPress={() => Alert.alert('abrir evento')}>
            <Image source={require('../../assets/exposicionArte.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Exposiciones de Arte</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.item}>
          <Pressable onPress={() => Alert.alert('abrir evento')}>
            <Image source={require('../../assets/lugaresTuristicos.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Lugares Turísticos</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.item}>
          <Pressable onPress={() => Alert.alert('abrir evento')}>
            <Image source={require('../../assets/ferias.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Ferias</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeFilters}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar Eventos</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleFilterByName}>
                <Text style={styles.filterButtonText}>Por Nombre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleFilterByDate}>
                <Text style={styles.filterButtonText}>Por Fecha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={closeFilters}>
                <Text style={styles.filterButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  container1: {
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 60,
    width: 300,
    borderColor: '#000',
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 50,
  },
  item: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 385,
    height: 88,
    borderRadius: 0,
  },
  textContainer: {
    width: 385,
    marginTop: -20,
    backgroundColor: 'rgba(108, 106, 108, 0.7)',
    borderRadius: 0,
    alignItems: 'center',
    height: 20,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    marginBottom: 20,
  },
  filterButtonText: {
  color: '#8B4513', //cambio de color de las letras
  fontSize: 16,
  fontWeight: 'bold',
},
modalButton: {
  backgroundColor: '#f5f5f5', // Color de fondo opcional
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
  alignItems: 'center',
  width: '100%', // Opcional para ajustar al contenedor
},
});

export default Eventos;
