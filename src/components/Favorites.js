import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
        <Text style={styles.text}>
          {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 300,
    alignItems: 'center',
    zIndex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
});

export default FavoriteButton;
