import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // Ícono para el botón

import {API_BASE_URL} from '@env'

import * as Location from "expo-location";
import Search1 from "../components/Search1";

export default function Mapa({navigation}) {

    const [origin, setOrigin] = useState({
        latitude: -17.3914858,
        longitude: -66.1424565,
    });

    const [eventList, setEventList] = useState(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null); // Referencia al mapa para manipularlo

    // Obtener la ubicación actual del usuario
    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        // Centrar el mapa en la nueva ubicación
        mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/event/events-to-map`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los eventos');
                }

                const events = await response.json();
                setEventList(events);
                (async () => {
                    let { status } = await Location.requestForegroundPermissionsAsync()
                    if (status !== "granted") {
                        alert("Permission denied");
                        return;
                    }
        
                    let location = await Location.getCurrentPositionAsync({})
                    
                    setOrigin({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                })()
            } catch (error) {
                console.log('Error: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Obtener la ubicación al inicio
    useEffect(() => {
        
    }, [])

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='#551E18' />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {eventList && (<View style={styles.Scontainer}>
                <Search1 mapRef={mapRef} events={ eventList } origin = { origin }/>
            </View>)}

            <MapView
                ref={mapRef} // Referencia al mapa
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker coordinate={origin} title="Mi ubicación" />

                {eventList && eventList.map((event, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: event.latitud, longitude: event.longitud }}
                        title={event.nombreEvento}
                    >
                        <View style={styles.customMarker}>
                            
                            <View style={styles.circle}>

                                {event.imagenes && event.imagenes[0] && event.imagenes[0].urlImagen ? (
                                    
                                    <Image
                                        source={{ uri: event.imagenes[0].urlImagen }}
                                        style={styles.imageInsideCircle}
                                      //  onPress={navigation.navigate("eventoMapa",event.codEvento)}
                                    />
                                ) : (
                                    <Text>Imagen no disponible</Text>
                                )}
                            </View>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Botón para redirigir a la ubicación */}
            <TouchableOpacity style={styles.locateButton} onPress={getUserLocation}>
                <Ionicons name="navigate" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    Scontainer: {
        top: 0,
        position: 'absolute',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    customMarker: {
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "red",
        borderWidth: 2,
    },
    imageInsideCircle: {
        borderRadius: 20,
        width: "100%",
        height: "100%",
    },
    locateButton: {
        position: "absolute",
        bottom: 50,
        right: 20,
        backgroundColor: "#551E18",
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // sombra para Android
        shadowColor: "#000", // sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
