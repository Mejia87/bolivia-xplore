import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';



export default function Content({text}) {
  return (
    <View style={styles.container}>
      <View style={styles.locationWrapper}>
        <Entypo size={22} name="location-pin" style={styles.locationIcon} />
        <Text style={styles.location}>
          Cochabamba
        </Text>
      </View>

      
      <Text style={styles.description}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    opacity: 0.8,
    fontSize: 14,
    fontFamily:'sans-serif',
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
    fontFamily:'serif',
    fontWeight:'bold',
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
});