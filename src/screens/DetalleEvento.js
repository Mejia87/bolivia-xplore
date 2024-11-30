import React, { useState } from 'react';
import { ListItem } from '@rneui/themed'
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { enableScreens } from 'react-native-screens';
import CarouselView from '../components/CarouselView';
import Content from '../components/Content';
import FavoriteButton from '../components/Favorites';
import BackButton from '../components/BackButton';
import LocationButton from '../components/LocationButton';

enableScreens();

export default function DetalleEvento({route}) {
  const {evento} = route.params
  
  const [expanded, setExpanded] = useState(true)
  const [expandedHistory, setExpandedHistory] = useState(true)
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View >
        <View style={styles.buttonContainer}>
          <BackButton />
          <FavoriteButton style={styles.favoritos}/>
        </View>
        <CarouselView images = {evento.imagenes}/>
        <Text style={styles.title}>{evento.nombreEvento}</Text>
        <ListItem.Accordion
          content= {
            <ListItem.Content>
              <ListItem.Title>Descripcion</ListItem.Title>
            </ListItem.Content>
          }

          isExpanded = {expanded}
          onPress={() => setExpanded(!expanded)}
        >

          <Content text = {evento.descripcionEvento} />
        </ListItem.Accordion>
        <ListItem.Accordion
          content= {
            <ListItem.Content>
              <ListItem.Title>Historia</ListItem.Title>
            </ListItem.Content>
          }

          isExpanded = {expandedHistory}
          onPress={() => setExpandedHistory(!expandedHistory)}
        >

          <Content text = {evento.historiaEvento} />
        </ListItem.Accordion>
        <LocationButton style={styles.location} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'flex-start', 
  },
  buttonContainer: {
    flexDirection:'row',
    flex: 1, 
    width: '100%',
    justifyContent: 'space-between', 
     
  },
  
  favoritos: {
    marginLeft:'100',
  },
  location: {
    marginTop:20,
  },
  title: {
    fontSize: 20,
    opacity: 0.8,
    fontFamily:'serif',
    fontWeight:'bold',
  },
});
