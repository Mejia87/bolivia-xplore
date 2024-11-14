import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const EventForm = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [imageUris, setImageUris] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a las fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUris([...imageUris, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const handleRemoveImage = (uri) => {
    setImageUris(imageUris.filter(imageUri => imageUri !== uri));
  };

  const handleSave = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      Alert.alert('Error', 'El nombre solo debe contener letras y espacios.');
      return;
    }

    if (startDate && endDate) {
      const today = new Date();
      if (startDate < today || endDate < today) {
        Alert.alert('Error', 'Las fechas deben ser desde hoy en adelante.');
        return;
      }
      if (endDate < startDate) {
        Alert.alert('Error', 'La fecha de finalización no puede ser anterior a la fecha de inicio.');
        return;
      }
    }

    Alert.alert('Guardado', 'Evento guardado con éxito');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Categoria del Evento</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item id = 'selecione una categoria' label="Seleccione una categoría" value="" />
        <Picker.Item id = 'Celebraciones Folkloricas'label="Celebraciones Folkloricas" value="Celebraciones Folkloricas" />
        <Picker.Item id = 'Ferias Tradicionales'label="Ferias Tradicionales" value="Ferias Tradicionales" />
        <Picker.Item id = 'Conciertos Contemporaneos'label="Conciertos Contemporaneos" value="Conciertos Contemporaneos" />
        <Picker.Item id = 'Exposiciones de Arte'label="Expociones de Arte" value="Expociones de Arte" />
        <Picker.Item id = 'Lugares Turisticos'label="Lugares Turisticos" value="Lugares Turisticos" />
      </Picker>

      <Text style={styles.label}>Nombre del Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese nombre de Evento..."
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Ingrese las Imágenes</Text>
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <MaterialIcons name="add-a-photo" size={24} color="#888" />
        <Text style={styles.imageText}>Añadir imágenes</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        {imageUris.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveImage(uri)}
            >
              <MaterialIcons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.label}>Fecha de Inicio del Evento</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {startDate ? startDate.toLocaleDateString() : 'd/m/a'}
        </Text>
        <MaterialIcons name="calendar-today" size={24} color="#888" />
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <Text style={styles.label}>Fecha de Finalización del Evento</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {endDate ? endDate.toLocaleDateString() : 'd/m/a'}
        </Text>
        <MaterialIcons name="calendar-today" size={24} color="#888" />
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <Text style={styles.label}>Ubicación del Evento</Text>
      <TouchableOpacity style={styles.locationButton}>
        <MaterialIcons name="location-on" size={24} color="#888" />
        <Text style={styles.locationText}>Seleccione ubicación</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Descripción del Evento</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Ingrese la descripción del evento..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Historia del Evento</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Ingrese la historia del evento..."
        multiline
        value={history}
        onChangeText={setHistory}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF', 
  },
  label: {
    fontSize: 18, // Aumentar el tamaño de letra
    marginVertical: 5,
    color: '#333333', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    fontSize: 16, // Aumentar el tamaño de letra
    backgroundColor: '#f0f0f0', 
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  imageText: {
    marginLeft: 8,
    fontSize: 16, // Aumentar el tamaño de letra
    color: '#333333',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0f0f0', 
  },
  dateText: {
    flex: 1,
    fontSize: 16, // Aumentar el tamaño de letra
    color: '#333333',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0f0f0', 
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16, // Aumentar el tamaño de letra
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    flex: 1,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default EventForm;

