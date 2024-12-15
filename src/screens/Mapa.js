import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator} from "react-native";
import MapView, { Circle, Marker, Polyline, Callout } from "react-native-maps";

import {API_BASE_URL} from '@env'

import * as Location from "expo-location";

import customMarker from '../../assets/urkupiña.png'

import data from '../data/data'

export default function Mapa() {
    const [origin, setOrigin] = useState({
        latitude: -17.3914858,
        longitude: -66.1424565,
    });
    const [destination, setDestination] = useState({
        latitude: -17.3961,
        longitude: -66.2818, //-17.392005, -66.155617
    });

    const [eventList, setEventLis] = useState(null)
    const [loading, setLoading] = useState(true)

    /*useEffect(() => {
        const fecthMap = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/event/filtered`)
                if(!response.ok) {
                    throw new Error('Error al obtener los eventos')
                }

                const events = await response.json()
                setEventLis(events)

            } catch (error) {
                console.log('Error: ', error)
            } finally {
                setLoading(false)
            }
        }

        fecthMap()
    },[])*/

    useEffect(() => {
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
            setLoading(false)
        })()
    }, [])

    if(loading) {
        return(
            <View style = {styles.loading}>
                <ActivityIndicator size='large' color='#551E18'/>
            </View>
        )
    }

    
    return (
        <View style={styles.container} >
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={origin} />

                {data.map((event, index) => (
                   
                    <Marker 
                    key={index}
                    coordinate={{latitude: event.latitud, longitude:event.longitud}} 
                    title= {event.name} 
                    style= {styles.marker}>
                   <View style={styles.customMarker}>
                        <View style={styles.circle}>
                            <Image
                                source={event.images[0].source} 
                                style={styles.imageInsideCircle}
                            />
                        </View>
                    </View>
                    
                </Marker>
            ))}
                

                
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        width: '100%',
        height: '100%',
        borderRadius: 100,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "red",
        borderWidth: 5,
        
    },
    imageInsideCircle: {
        borderRadius: 100,
        width:'100%',
        height:'100%'

    },

    marker: {
        width:80,
        height:80,
    },

    loading: {
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
});
