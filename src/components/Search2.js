import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bsearch from '../data/Bsearch';
import colors from '../styles/colors'

import {API_BASE_URL} from '@env'

const { width, height } = Dimensions.get('window');

const Search2 = ({  events , setEvents}) => {
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState(false);

  const cleanSearch = () => {
    setSearchText('')
    setEvents([])
    setFiltered(false);
  }

  const onPressedSearch = () => {
    const fecthMap = async () => {
      const payload = {
          'distancia': '0.0',
          'latitud': '0.0',
          'longitud': '0.0',
          'favorito':false,
          'eventoActivo':false,
         'fecha':null,
          'busqueda': searchText,
          'categoria': null,
          'codUsuario':null
         }

          try {
              const response = await fetch(`${API_BASE_URL}/api/event/filtered`, {
                  method: 'POST', 
                  headers: {
                      'Content-Type': 'application/json', 
                  },
                  body: JSON.stringify(payload)
              })
  
              if (!response.ok) {
                  throw new Error('Error al obtener los eventos')
              }
              const events = await response.json()
              setEvents(events)
          } catch (error) {
              console.log('Error: ', error)
          } finally {
            setFiltered(true);
          }
      }

      if(searchText.trim().length > 0){
        fecthMap()
      } else {
        cleanSearch()
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        
        <TextInput
          style={[styles.input, { fontSize: width * 0.04 }]}
          placeholder='Buscar evento'
          placeholderTextColor='gray'
          value={searchText}
          onBlur={ onPressedSearch }
          onKeyPress={(e) => {
            if(e.nativeEvent.key === 'Enter'){
              onPressedSearch()
            }
          } }
          onChangeText={(e) => {
            setSearchText(e)
          }}
        />{
          (filtered) && (<TouchableOpacity style={ [styles.presableSearch,{marginRight:5,borderRadius: 10,padding:0, backgroundColor:"red", color:"black" }] } onPress={ cleanSearch }>
            <Ionicons name='close' size={width * 0.02} color='gray' style={[styles.icon, { fontSize:20}]} />
          </TouchableOpacity>)}
          <TouchableOpacity style={ styles.presableSearch } onPress={ onPressedSearch }>
            <Ionicons name='search' size={width * 0.05} color='gray' style={styles.icon} />
          </TouchableOpacity> 
      </View>
      {((filtered) && ((events.length > 0) ? <Text>Resultados para : {searchText}</Text>:<Text style={{ color:"red" }}>No se encontraron eventos para : {searchText}</Text>))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:"white",
    width: width * 0.6,
    paddingLeft: 10,
    margin:10,
    borderWidth: 1,
  },
  icon: {
    color: "white",
  },
  input: {
    flex: 1,
  },
  presableSearch:{
    backgroundColor: colors.primary,
    padding:11,
  }
});

export default Search2;
