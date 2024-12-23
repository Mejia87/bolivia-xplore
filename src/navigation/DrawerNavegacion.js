import React, { useContext } from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Alert,
} from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { Badge, Icon } from "@rneui/base";
import { NavigationContext } from "../js/NavigationContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Perfil from "../screens/Perfil";
import Notificaciones from "../screens/Notificaciones";
import Ajustes from "../screens/Ajustes";
import Navegacion from "./Navegacion";
import { useState } from "react";
import Dnotificasiones from "../data/Dnotificasiones";
import NotificacionesStack from "../navigation/NotificacionesStack";
import { NotificationContext } from "../navigation/NotificationContext";
import { UserContext } from "../js/UserContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { useNavigation } from "@react-navigation/native";
import GestorEventosStack from "./GestorEventosStack";

const DrawerContent = (props) => {
    const navigation = useNavigation()
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.headerContentDrawer}>
                <Text style={styles.headerTitleDrawer}>BoliviaXplore</Text>
                <Image
                    style={styles.imageStyle}
                    source={require("../../assets/logo.png")}
                />
            </View>
            {Object.entries(props.descriptors).map(
                ([key, descriptor], index) => {
                    const focused = index === props.state.index;
                    const DrawerIcon = descriptor.options.drawerIcon;

                    return (
                        <DrawerItem
                            key={key}
                            label={() => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    {DrawerIcon && <DrawerIcon />}
                                    <Text
                                        style={[
                                            focused
                                                ? styles.drawerLabelFocused
                                                : styles.drawerLabel,
                                            { marginLeft: 10 },
                                        ]}
                                    >
                                        {descriptor.options.title}
                                    </Text>
                                </View>
                            )}
                            onPress={() =>
                                descriptor.navigation.navigate(
                                    descriptor.route.name
                                )
                            }
                            style={[
                                styles.drawerItem,
                                focused ? styles.drawerItemFocused : null,
                            ]}
                        />
                    );
                }
            )}
            <TouchableOpacity
                style={styles.cerrar}
                onPress={()=> navigation.navigate('login')}
            >
                <Icon name="sign-out-alt" type="font-awesome-5" size={20}  />
                <Text style={styles.cerrarText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const DrawerNavegacion = () => {
    const {user, setUser} = useContext(UserContext)
    const { notificationCount } = useContext(NotificationContext);
    const navigation = useNavigation();

    const { stateNavigation } = useContext(NavigationContext);
    const NotificationPress = () => {
        navigation.navigate("notificaciones", { notificationCount });
    };

    return (
        <Drawer.Navigator
            initialRouteName="inicio"
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: "#551E18",
                    height: 50,
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={styles.headerLeft}
                    >
                        <Icon
                            name="bars"
                            type="font-awesome-5"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                ),
            })}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name="inicio"
                component={Navegacion}
                options={{
                    title: "Inicio ",
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Text style={styles.headerTitle}>
                            {stateNavigation}
                        </Text>
                    ),
                    drawerIcon: () => (
                        <Icon
                            name="home"
                            type="font-awesome-5"
                            size={20}
                            color="black"
                        />
                    ),
                    headerRight: () => (
                        <View style={styles.headerRigth}>
                            <TouchableOpacity onPress={NotificationPress}>
                                <Icon
                                    name="bell"
                                    type="font-awesome-5"
                                    size={20}
                                    color="#fff"
                                />
                                {notificationCount > 0 && (
                                    <Badge
                                        status="primary"
                                        value={notificationCount}
                                        containerStyle={{
                                            position: "absolute",
                                            top: 0,
                                            left: 10,
                                        }}
                                        badgeStyle={{ backgroundColor: "red" }}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Drawer.Screen
                name="perfil"
                component={Perfil}
                options={{
                    title: "Perfil",
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Text style={styles.headerTitle}>Perfil</Text>
                    ),
                    drawerIcon: () => (
                        <Icon
                            name="user"
                            type="font-awesome-5"
                            size={20}
                            color="black"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name = 'Notificaciones'
                component={NotificacionesStack}
                options={{
                    title: "Notificaciones",
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Text style={styles.headerTitle}> Notificaciones</Text>
                    ),
                    drawerIcon: () => (
                        <Icon
                            name="bell"
                            type="font-awesome-5"
                            size={20}
                            color="black"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="ajustes"
                component={Ajustes}
                options={{
                    title: "Ajustes",
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Text style={styles.headerTitle}> Ajustes</Text>
                    ),
                    drawerIcon: () => (
                        <Icon
                            name="cogs"
                            type="font-awesome-5"
                            size={20}
                            color="black"
                        />
                    ),
                }}
            />
            {(user.rolUsuario === 1) && <Drawer.Screen
                name="gestorEventos"
                component={GestorEventosStack}
                options={{
                    title: "Gestor de eventos",
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Text style={styles.headerTitle}>
                            Gestor de eventos
                        </Text>
                    ),
                    drawerIcon: () => (
                        <Icon
                            name="calendar"
                            type="font-awesome-5"
                            size={20}
                            color="black"
                        />
                    ),
                }}
            />}
        </Drawer.Navigator>
    );
};
const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: 15,
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "500",
    },

    imageStyle: {
        width: 40,
        height: 40,
    },

    headerTitleDrawer: {
        color: "#551E18",
        fontSize: 18,
        fontWeight: "500",
    },
    headerContentDrawer: {
        marginRight: 15,
        margin: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    headerRigth: {
        marginRight: 30,
    },
    drawerLabel: {
        fontSize: 18,
        color: "black",
    },
    drawerLabelFocused: {
        fontSize: 14,
        color: "#551E18",
        fontWeight: "500",
    },
    drawerItem: {
        height: 50,
        justifyContent: "center",
    },
    drawerItemFocused: {
        backgroundColor: "#ba9490",
    },
    cerrar:{
      
        marginLeft: 15,
        alignItems: "center",
        flexDirection: "row",
    },
    cerrarText:{
      fontSize: 18,
      color: "black",
      padding:10,
    }

});

export default DrawerNavegacion;
