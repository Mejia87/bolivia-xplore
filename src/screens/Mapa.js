import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import MapView, { Circle, Marker, Polyline, Callout } from "react-native-maps";

import * as Location from "expo-location";

import customMarker from '../../assets/image.png'

export default function Mapa() {
    const [origin, setOrigin] = useState({
        latitude: -17.392005,
        longitude: -66.155617,
    });
    const [destination, setDestination] = useState({
        latitude: -17.416803,
        longitude: -66.2694, //-17.392005, -66.155617
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    return (
        <View style={styles.container} >
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.09,
                }}
            >
                <Marker coordinate={origin} />

                <Marker coordinate={destination} title="virgen de urkupiña">
                    <View style={styles.customMarker}>
                        <View style={styles.circle}>
                            <Image
                                source={customMarker} // Tu imagen aquí
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
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ff5733",
        borderWidth: 2,
    },
    imageInsideCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
