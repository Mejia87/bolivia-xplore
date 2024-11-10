import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';


import DrawerNavegacion from './src/navigation/DrawerNavegacion';
import { NavigationContainer } from '@react-navigation/native';
import Eventos from './src/screens/Eventos';

export default function App() {
  return (
    
    <NavigationContainer>
      <DrawerNavegacion/>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
