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
          color={isFavorite ? 'orange' : 'gray'}
        />
        <Text style={styles.text}>
          {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
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
