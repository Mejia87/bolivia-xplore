import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function Content({ text, showLocation = false }) {
  return (
    <View style={styles.container}>
      {showLocation && (
        <View style={styles.locationWrapper}>
          <Entypo size={22} name="location-pin" style={styles.locationIcon} />
          <Text style={styles.location}></Text>
        </View>
      )}
      <Text style={styles.description}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 0,
    opacity: 0.8,
    fontSize: 15,
    //fontFamily: 'sans-serif',
    marginBottom: 30,
  },
  locationIcon: {
    marginTop: 0,
    opacity: 0.6,
  },
  location: {
    fontSize: 20,
    opacity: 0.6,
    marginVertical: 4,

  },
  locationWrapper: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
});
