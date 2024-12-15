import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [notificationRecommendations, setNotificationRecommendations] = useState(false);
  const [nearbyEvents, setNearbyEvents] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      {/* Idioma */}

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

      {/* Ayuda */}
      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Ayuda</Text>
        <Text style={styles.optionSubtitle}>CEntro de Ayuda, Contactanos</Text>
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
});
