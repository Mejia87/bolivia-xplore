import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Notificaciones from '../screens/Notificaciones';
import DrawerNavegacion from './DrawerNavegacion';
import DetalleEvento from '../screens/DetalleEvento';
import Login from '../screens/Login';
import RegisterForm from '../screens/RegisterForm';
import Presentacion from '../screens/Presentacion'
const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        
       <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Login" }}
      />
       <Stack.Screen
        name="register"
        component={RegisterForm}
        options={{ title: "Register" }}
      />
       <Stack.Screen
        name="welcome"
        component={Presentacion}
        options={{ title: "Welcome" }}
      />
       <Stack.Screen
        name="home"
        component={DrawerNavegacion}
        options={{ title: "DramerNavegacion" }}
      />

      
    </Stack.Navigator>
  );
}
