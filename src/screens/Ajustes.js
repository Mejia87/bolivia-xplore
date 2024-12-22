import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet,Dimensions, TouchableOpacity, Alert } from 'react-native';
import { API_BASE_URL } from '@env';
import { enableScreens } from 'react-native-screens';
import Slider from '@react-native-community/slider';
import { UserContext } from '../js/UserContext';

enableScreens();
const { width, height } = Dimensions.get("window");
export default function SettingsScreen() {
  const [notificationRecommendations, setNotificationRecommendations] = useState(false);
  const [nearbyEvents, setNearbyEvents] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState(false);
  const [distance, setDistance] = useState(200);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setNotificationRecommendations(user.preferences.notificationRecomendation);
    setNearbyEvents(user.preferences.nearNotification);
    setDistance(user.preferences.distance);
    setUpcomingEvents(user.preferences.recomendations);
  },[])

  const doSomething = () => {
    updatePreferences()
    setUser({...user,preferences:{ 
        idPreferences: 1,
        language: "es",
        distance: distance,
        recomendations: true,
        favoriteNearNotification: nearbyEvents,
        notificationsRecomendation: notificationRecommendations,
        nearNotification: upcomingEvents,
     }})
  }

  const updatePreferences = async () => {
    const userPreferences = {
      idPreferences: user.preferences.idPreferences,
      distance: distance+".0",
      favoriteNearNotification: nearbyEvents,
      language: 'es',
      nearNotification: upcomingEvents,
      recomendations: true,
      notificationsRecomendation: notificationRecommendations,
    };
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
      <View>
        <Text style={styles.title}>Ajustes</Text>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Distancia</Text>
          <Slider style={styles.slider}
              minimumValue={10} 
              maximumValue={200} 
              step={20} 
              value={distance} 
              onValueChange={(value) => {setDistance(value);}} 
              minimumTrackTintColor="#1EB1FC" 
              maximumTrackTintColor="#000000" 
              thumbTintColor="#1EB1FC" />
              <Text>{ distance }</Text>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Recomendaciones de Notificaciones</Text>
          <Switch
            value={notificationRecommendations}
            onValueChange={(e) => {setNotificationRecommendations(e);doSomething();}}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Notificaciones de Eventos Cercanos</Text>
          <Switch value={nearbyEvents} onValueChange={(e) => {setNearbyEvents(e);doSomething();}} />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Notificaciones de Eventos Próximos</Text>
          <Switch value={upcomingEvents} onValueChange={(e) => {setUpcomingEvents(e); doSomething();}} />
        </View>

      </View>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Versión</Text>
        <Text style={styles.optionSubtitle}>1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: { 
    width: width*0.6, 
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent:"space-between",
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
