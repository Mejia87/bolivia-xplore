
//https://reactnative.dev/docs/style estilos de botones
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SeleccionarIdioma = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Idioma por defecto: Español

  const handleNext = () => {
    alert(`Has seleccionado: ${selectedLanguage === 'es' ? 'Español' : 'Inglés'}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Explora más sobre la tradición cultural de Bolivia!</Text>
      <Text style={styles.subtitle}>Selecciona el idioma de tu preferencia</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="Inglés" value="en" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', 
    paddingVertical: 280,
    //marginTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '70%',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    marginBottom: 40,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  button: {
    backgroundColor: '#f05454',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SeleccionarIdioma;
