import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity,Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bsearch from '../data/Bsearch';

import { API_BASE_URL } from '@env';
import calculateDistanceHarvensine from '../js/HarvensineDistance';

const { width, height } = Dimensions.get('window');

const Search1 = ({ events, mapRef, origin }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fecthMap = () => {
     setFilteredData( events.filter((data) =>
      {
        return data.nombreEvento.toLowerCase().includes(searchText.trim().toLowerCase())}
    ) )
    };
    if (searchText.length>0){
      fecthMap();
      console.log("filter", filteredData);
    } else {
      setFilteredData([])
    }
  }, [searchText]);

  const handlePress = (event) => {
    mapRef.current?.animateToRegion({
      latitude: event.latitud,
      longitude: event.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSearchText('')
   // navigation.navigate('EventDetail', { eventId: event.id });
  };

  const onPressBackground = () => {
    setSearchText('');
    setFilteredData([]);
  }

  const renderResultRows = ({item}) => {
    const distance = calculateDistanceHarvensine(item.latitud, item.longitud, origin.latitude, origin.longitude);
    return (
    <TouchableOpacity  onPress={() => {handlePress(item)}}>
      <View style={styles.containerRow}>
          <Image
            source={{uri:item.imagenes[0].urlImagen}}
            style={styles.notificationImage}
          />
          <View style={{ padding:7,margin:0,   gap:5, }}>
            <Text numberOfLines={2} // Limita a una línea
  ellipsizeMode="tail" style={styles.suggestionName}>{item.nombreEvento}</Text>
            <Text style={styles.suggestion}>A {distance}KM de distancia</Text>
          </View>
      </View>
    </TouchableOpacity>
  )}

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name='search' size={width * 0.05} color='gray' style={styles.icon} />
        <TextInput
          style={[styles.input, { fontSize: width * 0.04 }]}
          placeholder='Buscar evento'
          placeholderTextColor='gray'
          value={ searchText }
          onChangeText={ (e) => {setSearchText(e)} }
        />
      </View>
      
      {filteredData.length > 0 && (
        <><FlatList
        data={filteredData.slice(0, 8)} 
          keyExtractor={item => item.codEvento+Math.random() * (100 - 1 + 1) + 1}
          renderItem={renderResultRows}
          style={styles.suggestionsContainer}
        />
        </>
      )}
      {(searchText.length > 0) && (<Pressable style={styles.backgroundScreen} onPress={onPressBackground} />)}
    </View>
  );
};
const styles = StyleSheet.create({
  notificationImage: {
    width:width*0.11,
    height: 40,
    marginLeft: 10,
    borderRadius: 10,
  },
  backgroundScreen:{
    position:"absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: width,
    height: height,
    zIndex:-1
  },

  container: {
    alignItems: 'center',
    width: width * 0.8,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 1,
    paddingLeft: 10,
    width: width * 0.8,
    marginTop:10,
    backgroundColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "black"
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 100,
    width: width*0.8,
  },
  suggestion: {
    flexDirection:"row",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 11,
    width: width * 0.6,
    
  },
  suggestionName: {
    flexDirection:"row",
    fontSize: 12,
    width: width * 0.6,
  },
  containerRow:{
    flexDirection:"row",
    justifyContent: "start",
    alignItems: "center",
    padding:5,
    paddingLeft: 1,
    width: width * 0.8,
  }
  ,
});

export default Search1;
