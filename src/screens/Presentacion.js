import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

export default function Bienvenida({ onContinue }) {
  const { width } = Dimensions.get('window');
  const [currentPage, setCurrentPage] = useState(0);

  const images = [
    require('../../assets/cultur.jpg'),
    require('../../assets/inca.jpg'),
    require('../../assets/uyuni.png'),
    require('../../assets/andes.jpg'),
    require('../../assets/orquesta.jpg'),
    require('../../assets/sanales.jpg'),
  ];

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const customWidth = width * 0.95; 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a BoliviaXplore</Text>
      <Text style={styles.welcomeText}>"Descubre la riqueza cultural de Bolivia.
         Explora eventos únicos, lugares mágicos y tradiciones inolvidables que te
          conectarán con lo mejor de nuestra tierra."</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.carousel}
      >
        {images.map((image, index) => (
         
        <Image key={index} source={image} style={[styles.carouselImage, { width: customWidth }]} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },

  welcomeText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },

  carousel: {
    flexGrow: 0,
    marginBottom: 20,
  },
  carouselImage: {
    height: 350,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#b84b50',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#b84b50',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
