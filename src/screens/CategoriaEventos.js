import React from "react";
import { enableScreens } from "react-native-screens";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";

import Card from "../components/Card";
import Search from "../components/Search";
import React from "react";
import { enableScreens } from "react-native-screens";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";

import Card from "../components/Card";
import Search from "../components/Search";
enableScreens();
const { width, height } = Dimensions.get("window");
const CategoriaEventos = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container1} showsVerticalScrollIndicator={false}>
                <Search/>
                <Card
                    title="Celebraciones Folcloricas"
                    image={require("../../assets/celebracionFolklorica.jpg")}
                    event={() => navigation.navigate("eventoss",{idEvent: 1})}
                />
                <Card
                    title="Ferias Artesanales"
                    image={require("../../assets/feriaTradicional.jpg")}
                    event={() => navigation.navigate("eventoss", {idEvent: 2})}
                />
                <Card
                    title="Exposiciones de Arte"
                    image={require("../../assets/exposicionArte.jpg")}
                    event={() => navigation.navigate("eventoss", {idEvent: 3})}
                />
                <Card
                    title="Lugares Turisticos"
                    image={require("../../assets/lugaresTuristicos.jpg")}
                    event={() => navigation.navigate("eventoss",{idEvent: 4})}
                />
                <Card
                    title="Ferias Gastronomicas"
                    image={require("../../assets/ferias.jpg")}
                    event={() => navigation.navigate("eventoss", {idEvent: 5})}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    
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
