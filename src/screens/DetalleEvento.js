import React, { useState, useContext } from "react";
import { ListItem } from "@rneui/themed";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { enableScreens } from "react-native-screens";
import CarouselView from "../components/CarouselView";
import Content from "../components/Content";
import FavoriteButton from "../components/Favorites";
import BackButton from "../components/BackButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { PoticionContext } from "../js/positionContext";

enableScreens();

export default function DetalleEvento({ navigation }) {
    const route = useRoute();
    const { evento } = route.params;
    const { setPoint } = useContext(PoticionContext)
    const current = new Date();
    const dateEvent = new Date(evento.fechaInicioEvento);

    const visibleLocation =
        (evento.tipoEvento === "PERMANENTE") || (current <= dateEvent);

    const [expanded, setExpanded] = useState(true);
    const [expandedHistory, setExpandedHistory] = useState(true);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                <View style={styles.buttonContainer}>
                    <BackButton />
                    <FavoriteButton style={styles.favoritos} />
                </View>
                <CarouselView images={evento.imagenes} />
                <Text style={styles.title}>{evento.nombreEvento}</Text>

                <ListItem.Accordion
                    containerStyle={styles.accordionContainer}
                    content={
                        <ListItem.Content>
                            <ListItem.Title style={styles.accordionTitle}>
                                Descripción
                            </ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={expanded}
                    onPress={() => setExpanded(!expanded)}
                >
                    <Content
                        text={evento.descripcionEvento}
                        showLocation={false}
                    />
                </ListItem.Accordion>

                <ListItem.Accordion
                    containerStyle={styles.accordionContainer}
                    content={
                        <ListItem.Content>
                            <ListItem.Title style={styles.accordionTitle}>
                                Historia
                            </ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={expandedHistory}
                    onPress={() => setExpandedHistory(!expandedHistory)}
                >
                    <Content
                        text={evento.historiaEvento}
                        showLocation={false}
                    />
                </ListItem.Accordion>
                {visibleLocation ? (
                    <View style={styles.containerLocation}>
                        <TouchableOpacity
                            style={styles.buttonLocation}
                            onPress={() => {
                                setPoint({ latitud : evento.latitud, longitud : evento.longitud })
                                navigation.navigate("mapaPrincipal", {
                                    screen: "mapa",
                                })
                            }
                            }
                        >
                            <MaterialIcons
                                name="place"
                                size={24}
                                color="white"
                            />
                            <Text style={styles.textLocation}>Ver en Mapa</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <></>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        //flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#f5f5f5",
    },

    buttonContainer: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
    },

    favoritos: {
        marginLeft: "100",
    },

    location: {
        marginTop: 10,
    },

    title: {
        marginTop: 5,
        fontSize: 22,
        opacity: 0.8,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
    },

    accordionTitle: {
        fontWeight: "bold",
        marginBottom: 0,
    },

    accordionContainer: {
        backgroundColor: "#ba9490",
        borderRadius: 3,
        marginBottom: 5,
        paddingVertical: 8,
        marginHorizontal: 10,
    },

    containerLocation: {
        alignSelf: "certer",
        marginBottom: 10,
        zIndex: 1,
    },
    buttonLocation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#b84b50",
        backgroundColor: "#b84b50",
    },

    textLocation: {
        marginLeft: 2,
        fontSize: 16,
        color: "white",
    },
});
