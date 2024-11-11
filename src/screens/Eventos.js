import React from 'react';
import { View,Text, TextInput, Image, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons

const Eventos = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container1}>
        <View style={styles.searchContainer}>
          <Ionicons  name="search" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar evento"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.item}>
          <Pressable onPress={() => Alert.alert('abrir evento ')}>
            <Image source={require('../../assets/celebracionFolklorica.jpg')} style={styles.image} />
            <View style={styles.textContainer}>
            <Text style={styles.text}>Celebraciones Folklóricas</Text>
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

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
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
    marginTop: 60,
    width: 300,
    borderColor: '#000', 
    borderWidth: 2, 
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  item: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 385,
    height: 88,
    borderRadius: 0,
  },
  textContainer: {
    width: 385,
    marginTop: -20,
    
    backgroundColor: 'rgba(108, 106, 108, 0.7)', // 'gold' en RGBA con 30% de opacidad
    borderRadius: 0,
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
