import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import colors from '../styles/colors';

import { API_BASE_URL } from '@env';

const { width, height } = Dimensions.get('window');

const Search3 = ({ events, setEvents }) => {
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    distancia: 0.0,
    favorites: false,
    active: false,
  });
  const [initialOptions, setInitialOptions] = useState(selectedOptions);
  const [distance, setDistance] = useState('');

  const cleanSearch = () => {
    setSearchText('');
    setEvents([]);
    setFiltered(false);
  };

  const onPressedSearch = () => {
    const fetchMap = async () => {
      const payload = {
        'distancia': '0.0',
        'latitud': '0.0',
        'longitud': '0.0',
        'favorito': false,
        'eventoActivo': false,
        'fecha': null,
        'busqueda': searchText,
        'categoria': null,
        'codUsuario': null
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/event/filtered`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Error al obtener los eventos');
        }
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setFiltered(true);
      }
    };

    if (searchText.trim().length > 0) {
      fetchMap();
    } else {
      cleanSearch();
    }
  };

  const onPressedDist = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permiso de ubicación denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const fetchNearbyEvents = async () => {
      const payload = {
        'distancia': distance,
        'latitud': latitude.toString(),
        'longitud': longitude.toString(),
        'favorito': selectedOptions.favorites,
        'eventoActivo': selectedOptions.active,
        'fecha': null,
        'busqueda': '',
        'categoria': null,
        'codUsuario': null
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/event/filtered`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Error al obtener los eventos');
        }
        const events = await response.json();
        setEvents(events);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setFiltered(true);
      }
    };

    fetchNearbyEvents();
  };

  const toggleOption = (option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  const applyFilters = () => {
    setModalVisible(false);
    onPressedDist();
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
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, { fontSize: width * 0.04 }]}
          placeholder='Buscar evento'
          placeholderTextColor='gray'
          value={searchText}
          onBlur={onPressedSearch}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              onPressedSearch();
            }
          }}
          onChangeText={(e) => {
            setSearchText(e);
          }}
        />
        {filtered && (
          <TouchableOpacity
            style={[styles.presableSearch, { marginRight: 5, borderRadius: 10, padding: 0, backgroundColor: 'red', color: 'black' }]}
            onPress={cleanSearch}
          >
            <Ionicons name='close' size={width * 0.02} color='gray' style={[styles.icon, { fontSize: 20 }]} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.presableSearch} onPress={onPressedSearch}>
          <Ionicons name='search' size={width * 0.05} color='gray' style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.presableSearch} onPress={openModal}>
          <Ionicons name='options-outline' size={width * 0.05} color='gray' style={styles.icon} />
        </TouchableOpacity>
      </View>
      {filtered && (events.length > 0 ? (
        <Text>Resultados para: {searchText}</Text>
      ) : (
        <Text style={{ color: 'red' }}>No se encontraron eventos: {searchText}</Text>
      ))}

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
                style={styles.input2}
                keyboardType="numeric"
                value={distance}
                onChangeText={setDistance}
                placeholder="numero"
                placeholderTextColor="#ccc"
              />
            </View>
{/*
            {['favorites', 'active'].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => toggleOption(option)}
              >
                <Ionicons
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
            ))}      */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={applyFilters}
            >
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width * 0.6,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 1,
  },
  icon: {
    color: 'white',
  },
  input: {
    flex: 1,
  },
  presableSearch: {
    backgroundColor: colors.primary,
    padding: 11,
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
    backgroundColor: 'rgba(10, 36, 58, 0.9)',
    borderRadius: 10,
    marginTop: 110,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
  input2: {
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 80,
  },
});

export default Search3;
