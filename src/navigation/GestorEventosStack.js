import Eventos from '../screens/Eventos';
import DetalleEvento from '../screens/DetalleEvento';
import {createStackNavigator} from '@react-navigation/stack';
import EventForm from '../screens/AgregarEvento';
import GestorEventos from '../screens/GestorEventos';

const Stack = createStackNavigator();

export default function GestorEventosStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "gestor"
            component= {GestorEventos}
            options = {{title: "CrearForm"}}
        />
        
        <Stack.Screen
            name= "eventForm"
            component= {EventForm}
            options = {{title: "Evento"}}
        />

    </Stack.Navigator>
  );
}