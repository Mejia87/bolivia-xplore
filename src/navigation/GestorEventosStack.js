import Eventos from '../screens/Eventos';
import DetalleEvento from '../screens/DetalleEvento';

const Stack = createStackNavigator();

export default function GestorEventosStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen
            name= "crearForm"
            component= {EventForm}
            options = {{title: "CrearForm"}}
        />
        <Stack.Screen
            name= "evento"
            component= {DetalleEvento}
            options = {{title: "Evento"}}
        />
    </Stack.Navigator>
  );
}