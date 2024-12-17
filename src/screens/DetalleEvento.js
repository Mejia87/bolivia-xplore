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
        containerStyle={styles.accordionContainer}
          content={
            <ListItem.Content>
              <ListItem.Title style = {styles.accordionTitle}>Descripción</ListItem.Title>
            </ListItem.Content>
          }
          
          isExpanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
        <Content text={evento.descripcionEvento} showLocation={false} />
        </ListItem.Accordion>

        <ListItem.Accordion
        containerStyle={styles.accordionContainer}
          content={
            <ListItem.Content>
              <ListItem.Title style = {styles.accordionTitle}>Historia</ListItem.Title>
            </ListItem.Content>
          }
          
          isExpanded={expandedHistory}
          onPress={() => setExpandedHistory(!expandedHistory)}
        >
        <Content text={evento.historiaEvento} showLocation={false} />
        </ListItem.Accordion>
        <LocationButton style={styles.location} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  scrollContainer: {
    //flexGrow: 1, 
    justifyContent: 'center', 
    alignItems:'center',
    padding: 5,
    backgroundColor: '#f5f5f5',
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
    marginTop: 10,
  },

  title: {
    marginTop: 5,
    fontSize: 22,
    opacity: 0.8,
    fontWeight:'bold',
    textAlign:'center',
    padding:10,
  },

  accordionTitle:{
    fontWeight: 'bold',
    marginBottom: 0,
  },

  accordionContainer:{
    backgroundColor: '#ba9490',
    borderRadius: 3,
    marginBottom: 5,
    paddingVertical: 8,
    marginHorizontal: 10,
  }

});