import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet,SafeAreaView,Platform} from 'react-native';


import DrawerNavegacion from './src/navigation/DrawerNavegacion';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <SafeAreaView style= {styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
        <NavigationContainer>
          <DrawerNavegacion/>
        </NavigationContainer>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    overflow: 'hidden'
  },
});
