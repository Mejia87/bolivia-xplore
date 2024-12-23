import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Bienvenida({ navigation }) {
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
      <Text style={styles.title}>Bienvenido a</Text>
      <Text style={styles.subtitle}>BoliviaXplore</Text>
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
      <View style={{ width:"100%",flexDirection:"row",justifyContent:"flex-end" }}>
        <TouchableOpacity style={styles.button} onPress={()=> {navigation.navigate('home')}}>
          <Text style={styles.buttonText}>Comenzar  <Ionicons name="arrow-forward" size={20} color='gray' style={styles.icon} /></Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  icon:{
    color:"white",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    width:"100%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
    color: '#333',
  },

  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },

  welcomeText: {
    fontSize: 17,
    fontStyle: "italic",
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },

  carousel: {
    flexGrow: 0,
    marginBottom: 20,
  },
  carouselImage: {
    height: 400,
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
    justifyContent:"flex-end",
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
    justifyContent:"center",
    alignItems:"center",
  },
});
