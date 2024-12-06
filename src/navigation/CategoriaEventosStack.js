import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
 
import CategoriaEventosEventos from '../screens/CategoriaEventos';
import DetalleEvento from '../screens/DetalleEvento';
import Eventos from '../screens/Eventos';


const Stack = createStackNavigator();

export default function CategoriaEventosStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "eventos"
            component= {CategoriaEventosEventos}
            options = {{title: "Eventos"}}
        />
        <Stack.Screen
            name= "evento"
            component= {DetalleEvento}
            options = {{title: "Evento"}}
        />
        <Stack.Screen
            name= "eventoss"
            component= {Eventos}
            options = {{title: "Eventoss"}}
        />
    </Stack.Navigator>
  );
}