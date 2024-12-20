import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

import DrawerNavegacion from './src/navigation/DrawerNavegacion';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Presentacion from './src/screens/Presentacion';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [showPresentation, setShowPresentation] = useState(false); // Controla la pantalla de presentación

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
      <NavigationContainer>
        {!isAuthenticated ? (
          // Renderiza la pantalla de login
          <Login onLogin={() => {
            setIsAuthenticated(true); // Marca como autenticado
            setShowPresentation(true); // Activa la presentación
          }} />
        ) : showPresentation ? (
          // Renderiza la pantalla de presentación
          <Presentacion onContinue={() => setShowPresentation(false)} /> 
        ) : (
          // Renderiza la navegación principal
          <DrawerNavegacion />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    overflow: 'hidden',
  },
});
