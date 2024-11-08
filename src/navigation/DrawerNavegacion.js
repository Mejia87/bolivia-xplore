import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/base';

import Perfil from '../screens/Perfil';
import Notificaciones from '../screens/Notificaciones';
import Ajustes from '../screens/Ajustes';
import GestorEventos from '../screens/GestorEventos';
import Navegacion from './Navegacion';


const Drawer = createDrawerNavigator();

const drawerIconOptions = (route,color) => {
    let icono 
    switch (route.name)  {
      case 'perfil':
        icono = 'user';
        break;
      case 'notificaciones':
        icono = 'bell';
        break;
      case 'ajustes':
        icono = 'cogs';
        break;
      case 'gestorEventos':
        icono = 'calendar';
        break;
      case 'acercaDe':
        icono = 'info-circle';
        break;
      case 'cerrarSesion':
        icono = 'sign-out';
        break;
      case 'inicio':
        icono = 'home';
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

const DrawerNavegacion = () => {
  return (
    <Drawer.Navigator
            initialRouteName='inicio'
            screenOptions={({route}) => ({
              drawerIcon: ({color}) => drawerIconOptions(route, color),
              drawerActiveTintColor: '#a17dc3',
              drawerInactiveTintColor: '#442484',
              drawerStyle: {
                  backgroundColor: '#f8f9a',
                  with: 240
              },
          })}
          >
            <Drawer.Screen
                name = 'inicio'
                component={Navegacion}
                options={{
                    title: 'Inicio',
                }}
            />
            <Drawer.Screen
                name = 'perfil'
                component={Perfil}
                options={{
                    title: 'Perfil',
                }}
            />
            <Drawer.Screen
                name = 'notificaciones'
                component={Notificaciones}
                options={{
                    title: 'Notificaciones',
                }}
            />
            <Drawer.Screen
                name = 'ajustes'
                component={Ajustes}
                options={{
                    title: 'Ajustes',
                }}
            />
            <Drawer.Screen
                name = 'gestorEventos'
                component={GestorEventos}
                options={{
                    title: 'Gestor de eventos',
                }}
            />
            
        </Drawer.Navigator>

    
  )
}

export default DrawerNavegacion