import React, { useState,useContext  } from 'react';

import { View, Text, Button, StyleSheet, useWindowDimensions, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Dnotificasiones from '../data/Dnotificasiones';
import { useRoute } from '@react-navigation/native';
import {API_BASE_URL} from '@env'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DetalleEvento from './DetalleEvento';
import pdata from '../data/pdata';
import DrawerNavegacion from '../navigation/DrawerNavegacion';
import { NotificationContext } from '../navigation/NotificationContext';
const Notificaciones = () => {
  
  const { notificationCount, setNotificationCount } = useContext(NotificationContext);
  const navigation = useNavigation();
  const route= useRoute()
  //const [notificationCount, setNotificationCount]= route.params
  const { width, height } = useWindowDimensions();
  //const [notifications, setNotifications] = useState(Dnotificasiones);
 //const [notificationCount, setNotificationCount] = useState(Dnotificasiones.length);
 //const [notificationCount, setNotificationCount] = useState( Dnotificasiones ? Dnotificasiones.length : 0)
    
 const [notifications, setNotifications] = useState(Dnotificasiones || []);
  React.useEffect(() => {
    setNotificationCount(notifications.length);
  }, [notifications]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(item => item.id !== id));
    setNotificationCount(notificationCount - 1)
    //traido desde debajo del return// <DrawerNavegacion notificationCount={notificationCount} />
    //setNotificationCount(notificationCount - 1);
  };
  

  const confirmClearNotifications = () => {
    Alert.alert(
      'Confirmación',
      '¿Está seguro de que desea limpiar todas las notificaciones?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancelado'),
          style: 'cancel'
        },
        {
          text: 'Sí',
          onPress: () => {
            setNotifications([]);
            setNotificationCount(0);
            <DrawerNavegacion notificationCount={notificationCount} />
          },
        }
      ],
      { cancelable: false }
    );
  };
 
  const PNotificationPress = (id) => {
    if (id === "100") {
      navigation.navigate('Notificaciones');
        return;
    }

    const evento = pdata.find(event => event.codEvento === id);
    if (evento) {
        navigation.navigate('evento', { evento });
    } else {
        Alert.alert('El evento ya finalizo');
    }
  };

  const renderItem = ({ item }) => (
    <GestureHandlerRootView style={styles.notificationWrapper}>
      <Swipeable
        renderRightActions={() => (
          <View style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </View>
        )}
        onSwipeableRightOpen={() => handleDelete(item.id)}
      >
       
        <TouchableOpacity onPress={() => PNotificationPress(item.id)}>
          <View style={styles.notification}>
            <View style={styles.notificationText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            <View style={styles.notificationImageWrapper}>
              <Image
                source={item.imageNotificasion}
                style={styles.notificationImage}
              />
              <Text style={styles.distance}>{item.distancia}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
      <TouchableOpacity style={styles.arrowBackButton} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={20} color="white" style={styles.icon} />
     </TouchableOpacity>
     {/*<Text style={styles.headerTitle}>Notificaciones</Text>*/}
        <TouchableOpacity style={styles.clearButton} onPress={confirmClearNotifications}>
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay notificaciones</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  clearButton: {
    backgroundColor: '#8B2020',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  clearButtonText: {
     alignSelf: 'flex-end',
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  notificationWrapper: {
    flex: 1,
  },
  notification: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    flex: 1,
  },
  notificationImageWrapper: {
    alignItems: 'center',
  },
  notificationImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
  },
  distance: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#F78C8C',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    borderRadius: 5,
  },
  deleteButtonText: {
    
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  
  arrowBackButton: {
    backgroundColor: '#8B2020',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  
});

export default Notificaciones;