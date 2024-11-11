import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import CarouselView from '../components/CarouselView';
import Content from '../components/Content';
import FavoriteButton from '../components/Favorites';
import BackButton from '../components/BackButton';
import LocationButton from '../components/LocationButton';

enableScreens();

export default function DetalleEvento() {
  return (
    <View>
      <CarouselView/>
      <Content/>
      <LocationButton/>
      <FavoriteButton/>
      <BackButton/>
    </View>
  )
}