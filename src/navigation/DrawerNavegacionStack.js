import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Notificaciones from '../screens/Notificaciones';
import DrawerNavegacion from './DrawerNavegacion';
import DetalleEvento from '../screens/DetalleEvento';
const Stack = createStackNavigator();

export default function DrawerNavegacionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen
        name="drawerNavegacion"
        component={DrawerNavegacion}
        options={{ title: "DramerNavegacion" }}
      />

      <Stack.Screen
        name="notificaciones"
        component={Notificaciones}
        options={{ title: "Notificaciones" }}
      />
      <Stack.Screen
              name="DetalleEvento"
              component={DetalleEvento}
              options={{ title: "Evento" }}
            />
    </Stack.Navigator>
  );
}
