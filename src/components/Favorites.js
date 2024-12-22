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
          name={isFavorite ? 'star' : 'star-border'}
          size={24}
          color={isFavorite ? 'yellow' : 'gray'}
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
  
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(95, 31, 23, 0.35)',
    shadowRadius: 5,

  },
  
  button: {
    flexDirection: 'row',
    alignItems: 'center',
   
    padding: 10,
    borderRadius: 5,
    },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
});

export default FavoriteButton;
