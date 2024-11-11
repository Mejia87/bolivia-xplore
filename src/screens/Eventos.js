import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import CarouselView from '../components/CarouselView';
import Content from '../components/Content';
import Button from '../components/Button';
import FavoriteButton from '../components/Favorites';
import BackButton from '../components/BackButton';
import LocationButton from '../components/LocationButton';

enableScreens();

export default function Eventos() {
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