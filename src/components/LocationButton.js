import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LocationButton = () => {
  const goToLocation = () => {
    // Aquí puedes agregar la lógica para ir a la ubicación
    console.log('Ir a Ubicación');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToLocation}>
        <MaterialIcons name="map" size={24} color="#2196F3" />
        <Text style={styles.text}>Ver en Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 790,
    alignSelf: 'center',
    marginBottom: 0,
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3', 
    backgroundColor: '#fff', 
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2196F3',
  },
});

export default LocationButton;

