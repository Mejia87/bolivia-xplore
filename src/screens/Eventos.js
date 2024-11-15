import React from 'react';
import { enableScreens } from 'react-native-screens';
import {TextInput, Alert, Pressable, View, Text, Image, StyleSheet, FlatList, Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Pcategorias from '../data/Pcategorias';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons

import { Navigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

enableScreens();
const { width, height  } = Dimensions.get('window');

const ImageCard = ({ title, subtitle, imageSource,navigation }) => {
 
  const handlePressimage = () => {
    navigation.navigate('evento');
    
  
  };

  return (
   
      <TouchableOpacity style={styles.card} onPress={handlePressimage}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
       <Text style={[styles.title, { fontSize: RFPercentage(1) }]}>{title}</Text>
        <Text style={[styles.subtitle, { fontSize: RFPercentage(0.7) }]}>{subtitle}</Text>

      </View>
      </TouchableOpacity>
   
  );
};

const Eventos = ({navigation}) => {
  return (
   
      <View style={styles.containers}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={width * 0.05} color="gray" style={styles.icon1} />
          <TextInput
            style={[styles.input, { fontSize: width * 0.04 }]} // Ajusta el tamaño del texto
            placeholder="Buscar evento"
            placeholderTextColor="gray"
          />
        </View>
       
     
    
    <FlatList

      data={Pcategorias}
      
      renderItem={({ item }) => (
        <ImageCard 
          title={item.title} 
          subtitle={item.subtitle} 
       
          imageSource={item.imageSource} 
          navigation={navigation}
        />
      )}
      keyExtractor={item => item.id}
      numColumns={3} // Número de columnas

      contentContainerStyle={styles.container}
    />
    </View>
   
     
     
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: width / 3- 20, // Ajusta el ancho según el tamaño de la pantalla
    height: (width / 3 - 20) * 1.5, // Ajusta la altura manteniendo la proporción
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(108, 106, 108, 1)', 
  },
  image: {
    width: '100%',
    height: '80%',
  },
  conta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconTopRight: {
    position: 'absolute',
    top: 10, // Ajusta este valor según tus necesidades
    right: 10, // Ajusta este valor según tus necesidades
    width: 24,
    height: 24,
    borderRadius: 5, 
  },
  iconBottomLeft: {
    position: 'absolute',
    bottom: '25%', // Ajusta este valor según tus necesidades
    left: 10, // Ajusta este valor según tus necesidades
    width: 24,
    height: 24,
    borderRadius: 5, 
  },
  textContainer: {
    padding: '7%',
   
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'white',
  },
  containers: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10,
    height:width * 0.09, // Ajusta el ancho al 80% del ancho de la pantalla
    width: width * 0.6, // Ajusta el ancho al 80% del ancho de la pantalla
    borderColor: '#000',
    borderWidth: 2,
  },
  icon1: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    border: 'white',
  },


});

export default Eventos;
