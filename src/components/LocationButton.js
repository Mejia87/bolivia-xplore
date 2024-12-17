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
        <MaterialIcons name="place" size={24} color='white' />
        <Text style={styles.text}>Ver en Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: 10,
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b84b50', 
    backgroundColor: '#b84b50', 
  },
  
  text: {
    marginLeft: 2,
    fontSize: 16,
    color: 'white',
    
  },
});

export default LocationButton;

