import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';

import MapaStack from './MapaStack';
import CalendarioStack from './CalendarioStack';
import EventosStack from './EventosStack';



const Tab = createBottomTabNavigator();

function Navegacion() {

  const screenOptions = (route,color) => {
    let icono 
    switch (route.name)  {
      case 'mapaPrincipal':
        icono = 'map-marked';
        break;
      case 'eventosPrincipal':
        icono = 'cube';
        break;
      case 'calendarioPrincipal':
        icono = 'calendar-check';
        break;

    }

    return  (
      <Icon
        type='font-awesome-5'
        name= {icono}
        size={22}
        color={color}
      />
    );
  };

  return (
    <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: '#a17dc3',
          tabBarInactiveTintColor: '#442484',
          headerShown: false, 
        })}
        >
            <Tab.Screen
                name = 'mapaPrincipal'
                component = {MapaStack}
                options={{title: 'Mapa'}}
              />
            <Tab.Screen
                name = 'eventosPrincipal'
                component = {EventosStack}
                options={{title:'Eventos'}}
              />
            <Tab.Screen
                name = 'calendarioPrincipal'
                component = {CalendarioStack}
                options={{title:'Calendario'}}
              />

    </Tab.Navigator>
    
  );
}

export default Navegacion