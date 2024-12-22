import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetalleEvento from '../screens/DetalleEvento';
import Calendario from '../screens/Calendario';

const Stack = createStackNavigator();

export default function CalendarioStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "calendario"
            component= {Calendario}
            options = {{title: "Calendario"}}
        />
        <Stack.Screen
                    name= "evento"
                    component= { DetalleEvento }
                    options = {{title: "Evento"}}
                />

    </Stack.Navigator>
  );
}