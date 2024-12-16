import React, { useState, useEffect } from 'react';
import { Button, View, TextInput, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Bsearch from '../data/Bsearch';
import Search from '../components/Search';
const { width, height } = Dimensions.get('window');

const Mapa = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <Search />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    
  },
 
});

export default Mapa;
