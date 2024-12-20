import React, { useState, useContext, useCallback } from "react";
import { enableScreens } from "react-native-screens";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    Text
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { NavigationContext } from "../js/NavigationContext";

import { Ionicons } from '@expo/vector-icons';
import Card from "../components/Card";
import Search2 from "../components/Search2";
import Eventos from "./ImpresorEventos";
import { Pressable, State } from "react-native-gesture-handler";
enableScreens();
const { width, height } = Dimensions.get("window");

const CategoriaEventos = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { setStateNavigation } = useContext(NavigationContext);
    const categorias = [
        {
            title: "Celebraciones Folcloricas",
            image: require("../../assets/recomendaciones.png"),
            eventC: () => navigation.navigate("eventoss",{idEvent: 1, title:"Celebraciones Folcloricas"})
        },
        {
            title: "Festivales Tradicionales",
            image: require("../../assets/feriaTradicional.jpg"),
            eventC: () => navigation.navigate("eventoss", {idEvent: 4, title: "Festivales Tradicionales"})
        },
        {
            title: "Lugares Turisticos",
            image: require("../../assets/lugaresTuristicos.jpg"),
            eventC: () => navigation.navigate("eventoss", {idEvent: 3, title:"Lugares Turisticos"})
        },
        {
            title: "Museos",
            image: require("../../assets/exposicionArte.jpg"),
            eventC: () => navigation.navigate("eventoss",{idEvent: 2, title:"Museos"})
        },
        {
            title: "Expocicion de Arte",
            image: require("../../assets/museo.jpg"),
            eventC: () => navigation.navigate("eventoss", {idEvent: 5,title:"Expocicion de Arte"})
        },
        {
            title: "Ferias Artesanales",
            image: require("../../assets/ferias.jpg"),
            eventC: () => navigation.navigate("eventoss", {idEvent: 6,title:"Ferias Artesanales"})
        }
    ]
    useFocusEffect(useCallback(() => {
        setStateNavigation("Categorías");
    },[]))

    const RenderCategories = () => {
        return (<View style={styles.container}>
            <FlatList
                data={ categorias }
                renderItem={({ item }) => (
                <Card
                    title={ item.title }
                    image={ item.image }
                    event={ item.eventC}
                />)}
                keyExtractor={(item) => item.title}
                numColumns={1} 
                contentContainerStyle={styles.container2}
            />
        </View>)
    }

    const RenderResultSearch = () => {
        return(
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ImageCard evento={item}/>}
                keyExtractor={(item) => item.codEvento}
                numColumns={2} 
                contentContainerStyle={styles.container2}
            />
        </View>)
    }

    const ImageCard = ({evento}) => {
        const handlePressimage = () => {
             navigation.navigate("evento",{evento});
         }
        return (
            <TouchableOpacity style={styles.card} onPress={handlePressimage}>
                <Image source={{uri:evento.imagenes[0].urlImagen}} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={[styles.title2, { fontSize: RFPercentage(1.5) }]}>
                        {evento.nombreEvento}
                    </Text>
                    <View style= {[ styles.containerView ]}>
                        <Ionicons name='location' size={width * 0.04} color={"white"} style={styles.icon} /> 
                        <Text
                            style={[styles.subtitle, { fontSize: RFPercentage(1.4) }]}
                        >
                            ubicacion{evento.ubicacion}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (<>
                <Search2 events={data} setEvents={ setData }/>
    {(data.length == 0) ? <RenderCategories />:<RenderResultSearch />}
        
    </>);
};

const styles = StyleSheet.create({
    container2: {
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: width / 2.5 , 
        height: (width / 2.5) * 1.5, 
        margin: 10,
        borderRadius: 5,
        overflow: "hidden",
        objectFit: "cover",
        overflow: "hidden",
    },
    image: {
        width: "auto",
        height: "100%",
    },
    subtitle: {
        color: "white",
        width: "100%",
        alignItems:"center",
        justifyContent:"center",
    },
    containerView:{
        backgroundColor: "rgba(90, 17, 17, 0.61)",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    title2: {
        padding:10,
        fontWeight: "bold",
        color: "white",
        textAlign:"center",
        width: "100%",
        backgroundColor: "rgba(90, 17, 17, 0.61)"
    },
    title:{
        fontSize: 30,
        fontWeight: "bold", 
    },
    container1: {
        alignItems: "center",
    },
    container: {
      flex: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    textContainer: {
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems: "center",
        flex: 10,
        position: "absolute",
        width:"100%",
        height: "100%",     
    },
});




export default CategoriaEventos;
