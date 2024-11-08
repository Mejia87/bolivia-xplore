import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Eventos from '../screens/Eventos';

const Stack = createStackNavigator();

export default function EventosStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "eventos"
            component= {Eventos}
            options = {{title: "Eventos"}}
        />
    </Stack.Navigator>
  );
}