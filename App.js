import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import DrawerNavegacion from "./src/navigation/DrawerNavegacion";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Presentacion from "./src/screens/Presentacion";
import { NavigationContext } from "./src/js/NavigationContext";
import { PoticionContext } from "./src/js/positionContext";
import { NotificationProvider } from "./src/navigation/NotificationContext";
import Notificaciones from "./src/screens/Notificaciones";
import { UserContext } from "./src/js/UserContext";
import LoginStack from "./src/navigation/LoginStack";
import { MapContext } from "./src/js/MapContext";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [showPresentation, setShowPresentation] = useState(false); // Controla la pantalla de presentación
    const [stateNavigation, setStateNavigation] = useState("Mapa");
    const [point, setPoint] = useState({
        latitud: null,
        longitud: null,
    });
    const [user, setUser] = useState({
        codUsuario: 1,
        authProvider: "12345",
        correoUsuario: "adminpru671@gmail.com",
        nombreUsuario: "admin",
        fotoUsuario:
            "https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg",
        preferences: {
            idPreferences: 1,
            language: "es",
            distance: 200.0,
            recomendations: true,
            favoriteNearNotification: true,
            notificationsRecomendation: true,
            nearNotification: true,
        },
    });
    const [eventList, setEventList] = useState(null);
    return (
        <SafeAreaView style={styles.safeArea}>
            <MapContext.Provider value={{ eventList, setEventList }}>
            <UserContext.Provider value={{ user, setUser }}>
                <NotificationProvider>
                    <PoticionContext.Provider value={{ point, setPoint }}>
                        <NavigationContext.Provider
                            value={{ stateNavigation, setStateNavigation }}
                        >
                            <StatusBar
                                barStyle="dark-content"
                                backgroundColor="#ffffff"
                                translucent={false}
                            />
                            <NavigationContainer>
                                <LoginStack/>
                            </NavigationContainer>
                        </NavigationContext.Provider>
                    </PoticionContext.Provider>
                </NotificationProvider>
            </UserContext.Provider>
            </MapContext.Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        overflow: "hidden",
    },
});
