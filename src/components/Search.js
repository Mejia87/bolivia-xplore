import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bsearch from '../data/Bsearch';

const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
              <Text style={styles.suggestion}>{item.title}</Text>
            </TouchableOpacity>
          )}
          style={[styles.suggestionsContainer, { maxHeight: height * 0.4 }]} // Ajusta la altura máxima de la lista de sugerencias
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Search;
