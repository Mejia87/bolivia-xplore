import React from 'react'
import { Icon } from '@rneui/base'

export const screens = {
    Mapa : 'mapa',
    MapaStack: 'mapaStack',
    Eventos: 'eventos',
    EventosStack:'eventosStack',
    Calendario: 'calendario',
    CalendarioStack: 'calendarioStack',
    Perfil: 'perfil',
    Notificaciones: 'notificaciones',
    Ajustes:'ajustes',
    GestorEventos: 'gestorEventos',
    AcercaApp: 'acercaApp'
}

export const routes = [
    {
        name: screens.Mapa,
        focusedRoute:screens.Mapa,
        title:'Mapa',
        showInTab:false,
        showInDrawer:false,
        icon: (focused) =>
            <Icon name='map' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.MapaStack,
        focusedRoute:screens.MapaStack,
        title:'Mapa',
        showInTab:true,
        showInDrawer:false,
        icon: (focused) =>
            <Icon name='map' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.Eventos,
        focusedRoute:screens.EventosStack,
        title:'Eventos',
        showInTab:true,
        showInDrawer:false,
        icon: (focused) =>
            <Icon name='map' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.EventosStack,
        focusedRoute:screens.EventosStack,
        title:'Eventos',
        showInTab:true,
        showInDrawer:false,
        icon: (focused) =>
            <Icon name='map' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.Calendario,
        focusedRoute:screens.CalendarioStack,
        title:'Calendario',
        showInTab:true,
        showInDrawer:false,
        icon: (focused) =>
            <Icon name='map' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.CalendarioStack,
        focusedRoute:screens.CalendarioStack,
        title:'Calendario',
        showInTab:true,
        showInDrawer:false,
        icon: (focused) =>
            <Icon name='map' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.Perfil,
        focusedRoute:screens.Perfil,
        title:'Perfil',
        showInTab:false,
        showInDrawer:true,
        icon: (focused) =>
            <Icon name='user' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.Notificaciones,
        focusedRoute:screens.Notificaciones,
        title:'Notificaciones',
        showInTab:false,
        showInDrawer:true,
        icon: (focused) =>
            <Icon name='bell' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.Ajustes,
        focusedRoute:screens.Ajustes,
        title:'Ajustes',
        showInTab:false,
        showInDrawer:true,
        icon: (focused) =>
            <Icon name='user' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.GestorEventos,
        focusedRoute:screens.GestorEventos,
        title:'Gestor de eventos',
        showInTab:false,
        showInDrawer:true,
        icon: (focused) =>
            <Icon name='user' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    {
        name: screens.AcercaApp,
        focusedRoute:screens.AcercaApp,
        title:'Acerca de la app',
        showInTab:false,
        showInDrawer:true,
        icon: (focused) =>
            <Icon name='user' size={20} color = {focused ? '#551E18':'#000'}/>
    },
    
]