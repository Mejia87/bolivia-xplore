import {TextInput, Alert, Pressable, View, Text, Image, StyleSheet, FlatList, Dimensions,TouchableOpacity} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Pcategorias from '../data/Pcategorias';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';


enableScreens();
const { width, height  } = Dimensions.get('window');

const ImageCard = ({ title, subtitle, imageSource,navigation }) => {
  
  const handlePressTrash = () => {
    Alert.alert('Has presionado basurero');
  };

  const handlePressPencil = () => {
    Alert.alert('Has presionado lápiz');
  };
  const handlePressimag = () => {
    Alert.alert('ver el evento');
  };

  return (
    

      <TouchableOpacity  style={styles.card} onPress={handlePressimag}>
      <Image source={imageSource} style={styles.image} />
      <TouchableOpacity onPress={handlePressTrash} style={styles.iconTopRight}>
        <Image
          source={require('../../assets/trash.png')}
          style={styles.icon2}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePressPencil} style={styles.iconBottomLeft}>
        <Image
          source={require('../../assets/pencil.png')}
          style={styles.icon2}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
       <Text style={[styles.title, { fontSize: RFPercentage(1) }]}>{title}</Text>
        <Text style={[styles.subtitle, { fontSize: RFPercentage(0.7) }]}>{subtitle}</Text>

      </View>
      </TouchableOpacity>
   
  );
};

const GestorEventos = ({navigation}) => {
  const [hovered, setHovered] = useState(false);
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
     <View style={styles.containerB}>
      {hovered && (
        <View style={styles.bubble}>
          <Text style={styles.messageHoveredB}>Crear Evento</Text>
        </View>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.buttonB,
          pressed && styles.buttonPressedB,
        ]}
        onPress={() =>  alert('¡crear evento!')}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onPressIn={() => setHovered(true)}
        onPressOut={() => setHovered(false)}
      >
        <Icon name="plus" size={20} color="white" />
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
  },
  icon2: {
    width: 24,
    height: 24,
  },
  iconTopRight: {
    position: 'absolute',
    top: 10, // Ajusta este valor según tus necesidades
    right: 10, // Ajusta este valor según tus necesidades
    width: 24,
    height: 24,
    borderRadius: 10, 
  },
  iconBottomLeft: {
    position: 'absolute',
    bottom: '25%', // Ajusta este valor según tus necesidades
    left: 10, // Ajusta este valor según tus necesidades
    width: 24,
    height: 24,
    borderRadius: 10, 
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
    //alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
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

  containerB: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    
  },
  buttonB: {
    position: 'absolute',
    backgroundColor: '#1089D7',
    borderRadius: 20,
    padding: height * 0.02, // 2% de la altura de la pantalla
    right: width * 0.05, // 5% del ancho de la pantalla
    bottom: height * 0.1, // Ajusta la distancia desde el fondo
  },
  buttonPressedB: {
    opacity: 0.5, // Cambia la opacidad cuando el botón está presionado
  },
  bubble: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: height * 0.01, // 1% de la altura de la pantalla
    marginBottom: height * 0.02, // 2% de la altura de la pantalla
    alignItems: 'center',
    position: 'absolute', // Asegura que la posición sea absoluta
    right: width * 0.05, // 5% del ancho de la pantalla
    bottom: height * 0.15, // Ajusta la distancia desde el fondo para que esté encima del botón
  },
  messageHoveredB: {
    color: 'black',
    fontSize: 16,
  },

});

export default GestorEventos;
