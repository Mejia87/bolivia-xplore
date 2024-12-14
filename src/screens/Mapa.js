import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import MapView, { Circle, Marker, Polyline, Callout } from "react-native-maps";

import * as Location from "expo-location";

import customMarker from '../../assets/urkupiña.png'

export default function Mapa() {
    const [origin, setOrigin] = useState({
        latitude: -17.3914858,
        longitude: -66.1424565,
    });
    const [destination, setDestination] = useState({
        latitude: -17.3961,
        longitude: -66.2818, //-17.392005, -66.155617
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                alert("Permission denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({})
            console.log(location.coords.latitude)
            console.log(location.coords.longitude)
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        })()
    }, [])

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

                <Marker coordinate={destination} title="virgen de urkupiña" style= {styles.marker}>
                    <View style={styles.customMarker}>
                        <View style={styles.circle}>
                            <Image
                                source={customMarker} 
                                style={styles.imageInsideCircle}
                            />
                        </View>
                    </View>
                    
                </Marker>
                <Marker coordinate={{latitude:-17.56854 ,longitude:-65.76883}} title="virgen de la bella" style= {styles.marker}>
                    <View style={styles.customMarker}>
                        <View style={styles.circle}>
                            <Image
                                source={customMarker} 
                                style={styles.imageInsideCircle}
                            />
                        </View>
                    </View>
                    
                </Marker>

                
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
});
