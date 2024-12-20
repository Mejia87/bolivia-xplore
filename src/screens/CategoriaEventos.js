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


import Card from "../components/Card";
import Search2 from "../components/Search2";
import Eventos from "./ImpresorEventos";
import { State } from "react-native-gesture-handler";
enableScreens();
const { width, height } = Dimensions.get("window");

const CategoriaEventos = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { setStateNavigation } = useContext(NavigationContext);
    useFocusEffect(useCallback(() => {
        setStateNavigation("Categorías");
    },[]))
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container1} showsVerticalScrollIndicator={false}>
               <Text style={styles.title}>Categorias</Text>
                <Card
                    title="Celebraciones Folcloricas"
                    image={require("../../assets/celebracionFolklorica.jpg")}
                    event={() => navigation.navigate("eventoss",{idEvent: 1,title:"Celebraciones Folcloricas"})}
                />
                <Card
                    title="Festivales Tradicionales"
                    image={require("../../assets/feriaTradicional.jpg")}
                    event={() => navigation.navigate("eventoss", {idEvent: 2,title: "Festivales Tradicionales"})}
                />
                <Card
                    title="Lugares Turisticos"
                    image={require("../../assets/lugaresTuristicos.jpg")}
                    event={() => navigation.navigate("eventoss", {idEvent: 3,title:"Lugares Turisticos"})}
                />
                <Card
                    title="Museos"
                    image={require("../../assets/exposicionArte.jpg")}
                    event={() => navigation.navigate("eventoss",{idEvent: 4,title:"Museos"})}
                />
                <Card
                    title="Expocicion de Arte"
                    image={require("../../assets/ferias.jpg")}
                    event={() => navigation.navigate("eventoss", {idEvent: 5,title:"Expocicion de Arte"})}
                />
                <Card
                    title="Ferias Artesanales"
                    image={require("../../assets/recomendaciones.png")}
                    event={() => navigation.navigate("eventoss", {idEvent: 6,title:"Ferias Artesanales"})}
                />
             
            </ScrollView>
           
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight: "bold", 
    },
    container1: {
        alignItems: "center",
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    
    
    
    
    container1: {
        alignItems: "center",
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    
    
    
});




export default CategoriaEventos;
