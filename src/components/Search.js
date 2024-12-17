import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bsearch from '../data/Bsearch';

import {API_BASE_URL} from '@env'

const { width, height } = Dimensions.get('window');

const Search = ({ navigation, events , setEvents}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
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
                  setFilteredData(events)
                  setEvents(events)
                  console.log('eventos',events)
      
              } catch (error) {
                  console.log('Error: ', error)
              } finally {
                  setLoading(false)
              }
          }
      
          fecthMap()
      }, [searchText])

  useEffect(() => {
    if (searchText === '') {
      setFilteredData([]);
    } else {
      const filtered = Bsearch.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredData(filtered);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name='search' size={width * 0.05} color='gray' style={styles.icon} />
        <TextInput
          style={[styles.input, { fontSize: width * 0.04 }]}
          placeholder='Buscar evento'
          placeholderTextColor='gray'
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {/*filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
              <Text style={styles.suggestion}>{item.nombreEvento}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    height: width * 0.09,
    width: width * 0.6,
    borderColor: '#000',
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: width * 0.15,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 100,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Search;
