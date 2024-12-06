import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Cambia a ImagePicker si no usas Expo.

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Jose Antonio',
    email: 'JoseAntonio@gmail.com',
    city: 'Cochabamba',
    photo: null,
  });

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
              : require('../../assets/logo.png') // Imagen predeterminada
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editPhotoButton} onPress={handleImagePick}>
          <Text style={styles.editPhotoText}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      <Text style={styles.username}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.city}>{user.city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    paddingVertical: 380,
    paddingHorizontal: 100,
    backgroundColor: '#fff',
  },
  backArrow: {
    position: 'absolute',
    top: 0,
    left: 15,
  },
  arrowText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    position: 'absolute',
    marginTop: 60, // Ajusta según el diseño
    marginBottom: 10,
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
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
  },
  editPhotoText: {
    left: 2,
    height: 30,
    bottom: 0,
    color: '#fff',
    fontSize: 25,
    transform: [{ rotate: '110deg' }],
  },
  username: {
    position: 'absolute',
    marginTop: 220,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    position: 'absolute',
    marginTop: 255,
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  city: {
    position: 'absolute',
    marginTop: 275,
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
});

export default UserProfileScreen;
