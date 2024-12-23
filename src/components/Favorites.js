import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons
import { API_BASE_URL } from "@env";
const FavoriteButton = ({ favorite, setFavorite, eventId, userId }) => {

  const updateFavorite = async () => {
    const methodPayload = favorite ? 'DELETE':'POST';
    setFavorite(!favorite);
    const payload = {
      codEvento: eventId,
      codUsuario: userId
    }
    await fetch(`${API_BASE_URL}/api/event/mark-favorite`, {
        method: methodPayload, 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload)
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={ updateFavorite }>
        <MaterialIcons
          name={favorite ? 'star' : 'star-border'}
          size={24}
          color={favorite ? 'yellow' : 'gray'}
        />
        <Text style={styles.text}>
          {favorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
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
