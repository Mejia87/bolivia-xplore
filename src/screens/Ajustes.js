import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { API_BASE_URL } from '@env';

export default function SettingsScreen() {
  const [notificationRecommendations, setNotificationRecommendations] = useState(false);
  const [nearbyEvents, setNearbyEvents] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState(false);

  // Simulación del ID y distancia predeterminada
  const userPreferences = {
    idPreferences: 1,
    distance: 10.0, // Siempre en formato decimal
    favoriteNearNotification: nearbyEvents,
    language: 'en',
    nearEventNotification: upcomingEvents,
    recomendations: true,
    notificationRecomendation: notificationRecommendations,
  };

  const updatePreferences = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/updatepreferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPreferences),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Las preferencias se han actualizado correctamente.');
      } else {
        const errorMessage = await response.text();
        Alert.alert('Error', `No se pudo actualizar: ${errorMessage}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al actualizar las preferencias.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      {/* Recomendaciones de Notificaciones */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Recomendaciones de Notificaciones</Text>
        <Switch
          value={notificationRecommendations}
          onValueChange={setNotificationRecommendations}
        />
      </View>

      {/* Permitir Notificaciones de Eventos Cercanos */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Permitir Notificaciones de Eventos Cercanos</Text>
        <Switch value={nearbyEvents} onValueChange={setNearbyEvents} />
      </View>

      {/* Permitir Notificaciones de Eventos Próximos */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Permitir Notificaciones de Eventos Próximos</Text>
        <Switch value={upcomingEvents} onValueChange={setUpcomingEvents} />
      </View>

      {/* Botón para guardar cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={updatePreferences}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Versión */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Versión</Text>
        <Text style={styles.optionSubtitle}>1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionTitle: {
    fontSize: 16,
    color: '#000',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#551e18',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
