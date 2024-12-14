import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
 
import CategoriaEventosEventos from '../screens/CategoriaEventos';
import DetalleEvento from '../screens/DetalleEvento';
import Eventos from '../screens/Eventos';
import Notificaciones from '../screens/Notificaciones';


const Stack = createStackNavigator();

export default function NotificacionesStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "even"
            component= {Notificaciones}
            options = {{title: "Even"}}
        />
        <Stack.Screen
            name= "evento"
            component= {DetalleEvento}
            options = {{title: "Evento"}}
        />
      
    </Stack.Navigator>
  );
}