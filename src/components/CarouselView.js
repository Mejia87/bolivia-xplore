import { View, StyleSheet, Dimensions, Text, Image,ImageBackground } from 'react-native';
import React from 'react';
import Carousel from 'pinar';
import Constants from 'expo-constants';


const height = Dimensions.get('window').height;
const marginTop = Constants.statusBarHeight;

export default function CarouselView({images}) {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, { backgroundColor: 'white' }]}
      >
        {images.map((img) => (
          <ImageBackground resizeMode= 'cover' style={styles.image} source={{uri:img.urlImagen}} key={images.index} />
        ))}
      </Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: 'silver',
    marginHorizontal: 3,
    borderRadius: 3,
  },
  image: {
    height: '100%',
    borderRadius: 20,
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselContainer: {
    height: 300,
    marginHorizontal: 10,
  },
});
