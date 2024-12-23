import React, { useState, useContext, useEffect } from "react";
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
import { UserContext } from "../js/UserContext";

enableScreens();

export default function DetalleEvento({ navigation }) {
    const route = useRoute();
    const { evento } = route.params;
    
    const { setPoint } = useContext(PoticionContext);
    const { user } = useContext(UserContext);
    const current = new Date();

    const initEvent = new Date(evento.fechaInicioEvento);
    const finEvent = new Date(evento.fechaFinEvento) ;

    const visibleLocation =
        (evento.tipoEvento === "PERMANENTE") || ( initEvent <= current && current <= finEvent );

    const [expanded, setExpanded] = useState(true);
    const [expandedHistory, setExpandedHistory] = useState(true);

    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        console.log("evento", evento)
        if( typeof evento.favorito === 'boolean'){
            setFavorito(evento.favorito);
        } else {
            let isFavorite = evento.favorito.some(
                (fav) => fav.codUsuario == user.codUsuario
            );
            setFavorito(isFavorite)
        }
    },[])

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                <View style={styles.buttonContainer}>
                    <BackButton />
                    <FavoriteButton favorite={ favorito } setFavorite={ setFavorito } eventId={ evento.codEvento } userId={ user.codUsuario } style={styles.favoritos} />
                </View>
                <CarouselView images={evento.imagenes} />
                <View style={styles.tipoCategor}>
                <Text style={styles.stitle}>
                {(() => {
                      switch (evento.idTipoEvento) {
                        case 1:
                           return 'Celebraciones Folcloricas';
                        case 2:
                           return 'Museos';
                        case 3:
                          return 'Lugares Turisticos';
                        case 4:
                           return 'Festivales Tradicionales';
                        case 5:
                           return 'Expocicion de Arte';
                        case 6:
                            return 'Ferias Artesanales';
                        default:
                        return evento.idTipoEvento; 
                         }
                     })()}
                    </Text>
                </View>
                <View style={styles.tipoContainer}>
                {evento.tipoEvento === "PERMANENTE" ? (
                <Text style={styles.stitle}>Evento Permanente</Text>  
                 ) : (
                     <>
                   <Text style={styles.stitle}>fecha de inicio del evento:{evento.fechaInicioEvento.split('T')[0]}</Text>
                 <Text style={styles.stitle}>fecha de fin del evento:{evento.fechaFinEvento.split('T')[0]}</Text>
                   </>
                 )}

                </View>
                <View style={styles.titleContainer}>
                <Text style={styles.title}>{evento.nombreEvento}</Text>
                </View>
                {evento.ubicacion ? (
                  <View style={styles.stitleContainer}>
                   <Text style={styles.stitle}>{evento.ubicacion}</Text>
                  </View>
                     ) : null}
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
        padding: 1,
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
        flexDirection: "row",
        justifyContent:"center",
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
        width:180,
    },

    textLocation: {
        marginLeft: 2,
        fontSize: 16,
        color: "white",
    },
    titleContainer: {
        backgroundColor: 'rgba(248, 209, 35, 0.67)',
        borderRadius: 3,
        marginBottom: 5,
        paddingVertical: 8,
        marginHorizontal: 10,
        
    }
    ,
    tipoContainer: {
        backgroundColor: "#ba9490",
        borderRadius: 3,
        marginBottom: 5,
        paddingVertical: 8,
        marginHorizontal: 10,
        
    },
    stitle: {
        fontWeight: "bold",
        marginBottom: 0,
        textAlign: "center",
    },
    tipoCategor: {
        backgroundColor: 'rgba(190, 144, 154, 0.66)',
        borderRadius: 3,
        marginBottom: 5,
        paddingVertical: 8,
        marginHorizontal: 10,
        
    },
    
    stitleContainer: {
        backgroundColor: 'rgba(241, 210, 71, 0.38)',
        borderRadius: 3,
        marginBottom: 5,
        paddingVertical: 8,
        marginHorizontal: 10,
        
    },

});
