import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useCallback,
} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Button,
    TouchableWithoutFeedback,
    Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from "@env";

import * as Location from "expo-location";
import Search1 from "../components/Search1";
import MapWithCursor from "../components/FavoriteCursor";
import { NavigationContext } from "../js/NavigationContext";
import { PoticionContext } from "../js/positionContext";
import { useRoute } from "@react-navigation/native";

export default function Mapa({ navigation }) {
    const route = useRoute();

    const [favorites, setFavorites] = useState([]);
    const codUsuario = 1;
    const [origin, setOrigin] = useState(null);
    const { setStateNavigation } = useContext(NavigationContext);
    const { point } = useContext(PoticionContext);
    const [region, setRegion] = useState({
        latitude: -17.3914858,
        longitude: -66.1424565,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [eventList, setEventList] = useState(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const processEventFactory = (events) => {
        const colors = [
            "rgba(76, 207, 72, 0.7)",
            "rgba(197, 177, 28, 0.7)",
            "rgba(26, 176, 206, 0.7)",
            "rgba(154, 175, 76, 0.7)",
            "rgba(57, 127, 170, 0.7)",
            "rgba(147, 206, 153, 0.7)",
            "rgba(41, 105, 184, 0.7)",
            "rgba(187, 150, 50, 0.7)",
            "rgba(140, 173, 159, 0.7)",
            "rgba(192, 178, 90, 0.7)",
            "rgba(194, 99, 40, 0.7)",
            "rgba(145, 224, 111, 0.7)",
            "rgba(1, 141, 163, 0.7)",
        ];
        const red = "red";
        const eventWithFavorites = events.map((event) => {
            let isFavorite = event.favorito.some(
                (fav) => fav.codUsuario == codUsuario
            );
            event.favorito = isFavorite;
            event.color = isFavorite ? colors.pop() : red;
            return event;
        });
        setFavorites(eventWithFavorites.filter((event) => event.favorito));
        setEventList(eventWithFavorites);
    };

    const centerMap = () => {
        mapRef.current?.animateToRegion({
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    const moveMap = (latitude, longitude) => {
        mapRef.current?.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    useEffect(() => {
        const { latitud, longitud } = point;
        if (latitud != null && longitud != null) {
            moveMap(latitud, longitud);
        }
    }, [point]);

    useFocusEffect(
        useCallback(() => {
            setStateNavigation("Mapa");
        }, [])
    );

    useEffect(() => {
        setStateNavigation("Mapa");
        const fetchEvents = async () => {
            try {
                (async () => {
                    let { status } =
                        await Location.requestForegroundPermissionsAsync();
                    if (status !== "granted") {
                        alert("Permission denied");
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});

                    setOrigin({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });

                    setRegion({
                        ...region,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                })();
                const response = await fetch(
                    `${API_BASE_URL}/api/event/events-to-map`,
                    {
                        method: "GET",
                    }
                );

                if (!response.ok) {
                    throw new Error("Error al obtener los eventos");
                }

                const events = await response.json();
                processEventFactory(events);
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#551E18" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {eventList && (
                <View style={styles.Scontainer}>
                    <Search1
                        mapRef={mapRef}
                        events={eventList}
                        origin={origin}
                    />
                </View>
            )}

            {!loading && origin ? (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={setRegion}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={origin} title="Mi ubicación" />

                    {eventList &&
                        eventList.map((event, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: event.latitud,
                                    longitude: event.longitud,
                                }}
                                onPress={() => {
                                    setSelectedEvent(event);
                                    setVisible(true);
                                }}
                            >
                                <View style={styles.customMarker}>
                                    <View
                                        style={[
                                            styles.circle,
                                            {
                                                borderColor: event.color,
                                                borderWidth: event.favorito
                                                    ? 4
                                                    : 2,
                                            },
                                        ]}
                                    >
                                        {event.imagenes &&
                                        event.imagenes[0] &&
                                        event.imagenes[0].urlImagen ? (
                                            <Image
                                                source={{
                                                    uri: event.imagenes[0]
                                                        .urlImagen,
                                                }}
                                                style={styles.imageInsideCircle}
                                            />
                                        ) : (
                                            <Text>Imagen no disponible</Text>
                                        )}
                                    </View>
                                </View>
                            </Marker>
                        ))}
                </MapView>
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#551E18" />
                </View>
            )}
            {selectedEvent && (
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity
                                        style={styles.closeButtonTopRight}
                                        onPress={() => setVisible(false)}
                                    >
                                        <Text style={styles.closeButtonText}>
                                            ✕
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.title}>
                                        {selectedEvent.nombreEvento}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        {selectedEvent.descripcionEvento}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.buttonModal}
                                        onPress={() => {
                                            setVisible(false);
                                            navigation.navigate(
                                                "detalleEventoMap",
                                                {
                                                    evento: selectedEvent,
                                                }
                                            );
                                        }}
                                    >
                                        <Text style={styles.buttonText}>
                                            Ver detalles
                                        </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
            {favorites.map((data) => (
                <MapWithCursor
                    key={data.codEvento}
                    mapRef={mapRef}
                    event={data}
                    region={region}
                />
            ))}

            <TouchableOpacity style={styles.locateButton} onPress={centerMap}>
                <Ionicons name="location" size={30} color="#fff" />
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
        position: "absolute",
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
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        position: "relative",
    },
    closeButtonTopRight: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.1)", 
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        textAlign: "center",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#555",
    },
    buttonModal: {
        backgroundColor: "#f05454",
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
