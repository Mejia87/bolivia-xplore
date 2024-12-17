
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const Bienvenido = () => {
  const handleNext = () => {
    Alert.alert('Botón comenzar presionado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a BoliviaXplore</Text>
      <Text style={styles.subtitle}>!unete a nosotros para mantener vivas nuestras constumbres y compartir la belleza de Bolivia con el mundo¡</Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 70,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
    marginBottom: 70,
  },
  button: {
    backgroundColor: '#f05454',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Bienvenido;
