import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import CarouselView from '../components/CarouselView';
import Content from '../components/Content';
import Button from '../components/Button';

enableScreens();

export default function Eventos() {
  return (
    <View>
      <CarouselView/>
      <Content/>
      <Button/>
    </View>
  )
}