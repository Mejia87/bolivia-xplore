import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Mapa from '../screens/Mapa';


const Stack = createStackNavigator();

export default function MapaStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "mapa"
            component= {Mapa}
            options = {{title: "Mapa"}}
        />
    </Stack.Navigator>
  );
}