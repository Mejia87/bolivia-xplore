import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Jose Antonio',
    email: 'JoseAntonio@gmail.com',
    city: 'Cochabamba',
    photo: null,
  });

  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para modo edición
  const [tempUser, setTempUser] = useState({ ...user }); // Almacena cambios temporales

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a tus fotos para cambiar la imagen.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUser((prevUser) => ({ ...prevUser, photo: { uri: result.assets[0].uri } }));
    }
  };

  const handleEditToggle = () => {
    setTempUser({ ...user });
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUser({ ...tempUser });
    setIsEditing(false); 
  };

  return (
    <View style={styles.container}>
      {/* Botón de volver */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Text style={styles.arrowText}>←</Text>
      </TouchableOpacity>

      {/* Foto de perfil */}
      <View style={styles.imageContainer}>
        <Image
          source={
            user.photo
              ? user.photo
              : require('../../assets/logo.png') 
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editPhotoButton} onPress={handleImagePick}>
          <Text style={styles.editPhotoText}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={tempUser.name}
            onChangeText={(text) => setTempUser((prev) => ({ ...prev, name: text }))}
          />
          <TextInput
            style={styles.input}
            value={tempUser.email}
            onChangeText={(text) => setTempUser((prev) => ({ ...prev, email: text }))}
          />
          <TextInput
            style={styles.input}
            value={tempUser.city}
            onChangeText={(text) => setTempUser((prev) => ({ ...prev, city: text }))}
          />
        </>
      ) : (
        <>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.city}>{user.city}</Text>
        </>
      )}

      {/* Botón de editar / guardar */}
      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: isEditing ? '#4CAF50' : '#ffff' }]}
        onPress={isEditing ? handleSave : handleEditToggle}
      >
        <Text style={styles.editButtonText}>{isEditing ? 'Guardar Cambios' : 'Editar información'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 320,
    //paddingHorizontal: 50,
    backgroundColor: '#fff',
    //flex: 1,
  },
  backArrow: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  arrowText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    marginTop: 150,
    marginBottom: 20,
    alignItems: 'center',
    position: 'absolute',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: '#ccc',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    width: 35,
    height: 35,
    backgroundColor: '#551E18',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhotoText: {
    color: '#fff',
    top: 1,
    left: 4,
    fontSize: 25,
    fontWeight: 'bold',
    transform: [{ rotate: '110deg' }], 
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  city: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  editButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
