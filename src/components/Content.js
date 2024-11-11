import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';



export default function Content() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fiesta Tradicional Urkupina</Text>

      {/* Ubicación */}
      <View style={styles.locationWrapper}>
        <Entypo size={22} name="location-pin" style={styles.locationIcon} />
        <Text style={styles.location}>
          Cochabamba
        </Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>
        Welcome to your luxurious retreat! This stunning 5-bedroom estate offers
        an unparalleled blend of elegance and comfort. Step into spacious
        interiors adorned with exquisite finishes and flooded with natural
        light. Indulge in the gourmet kitchen, perfect for culinary enthusiasts,
        or unwind in the lavish master suite with its own private oasis. With a
        sprawling backyard, pool, and entertainment deck, every day feels like a
        vacation. This is more than a home; it's a lifestyle. Don't miss your
        chance to experience the pinnacle of luxury living.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    opacity: 0.7,
    fontSize: 14,
  },

  locationIcon: {
    opacity: 0.6,
  },
  location: {
    fontSize: 13,
    opacity: 0.6,
    marginVertical: 4,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    opacity: 0.8,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
});