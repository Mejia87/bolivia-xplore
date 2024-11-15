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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
          <Ionicons  name="search" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={[styles.input, { fontSize: width * 0.04 }]} // Ajusta el tamaño del texto
            placeholder="Buscar evento"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.item}>
          <Pressable onPress={() => navigation.navigate('evento')}>
            <Image source={require('../../assets/celebracionFolklorica.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
            <Text style={styles.text}>Celebraciones Folklóricas cambio</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.item}>
          <Pressable onPress={() => Alert.alert('abrir evento')}>
            <Image source={require('../../assets/feriaTradicional.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
            <Text style={styles.text}>Ferias Tradicionales</Text>
            </View>
         </Pressable>
        </View>

       <View style={styles.item}>
         <Pressable onPress={() => Alert.alert('abrir evento')}>
           <Image source={require('../../assets/exposicionArte.jpg')} style={styles.image} />
           <View style={styles.textContainer}>
             <Text style={styles.text}>Exposiciones de Arte</Text>
           </View>
         </Pressable>
       </View>

      <View style={styles.item}>
        <Pressable onPress={() => Alert.alert('abrir evento')}>
          <Image source={require('../../assets/lugaresTuristicos.jpg')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Lugares Turísticos</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => Alert.alert('abrir evento')}>
          <Image source={require('../../assets/ferias.jpg')} style={styles.image} />
           <View style={styles.textContainer}>
             <Text style={styles.text}>Ferias</Text>
           </View>
        </Pressable>
      </View>

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
    width:'100%'
    
  },
  container1: {
    alignItems: 'center',
    justifyContent:'center'
  },
  searchContainer: {
    flexDirection:'row-reverse',
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
    marginTop: 20,
    width: 300,
    borderColor: '#000', 
    borderWidth: 2, 
    alignItems:'center',
    justifyContent:'center',

  },
  
  input: {
    flex: 1,
    fontSize: 16,
  },
  item: {
    
    alignItems: 'center',
    justifyContent:'center',
    marginTop:20,
    maxWidth:'80%',
    borderRadius:20,
    
  },
  image: {
    width: 350,
    height: 88,
    borderRadius: 0,
    borderRadius:10,
  },
  textContainer: {
    width: 350,
    marginTop: -20,
    
    backgroundColor: 'rgba(108, 106, 108, 0.7)', // 'gold' en RGBA con 30% de opacidad
    borderRadius: 10,
    alignItems: 'center',
    height: 20,
   },
  text: {
  
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },


  
});

export default Eventos;
