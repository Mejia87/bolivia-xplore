import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { enableScreens } from "react-native-screens";
import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import { Button, Icon } from "@rneui/base";
import { CheckBox, ListItem, Avatar } from "@rneui/themed";

import data from "../data/data";
import { ScrollView } from "react-native";
import Modal from "../components/Modal";
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

enableScreens();

const GestorEventos = ({ navigation }) => {
    const [longPressActive, setLongPressActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false)

    

     useEffect(() => {
        updateEvent()   
        }, [])

   useFocusEffect(useCallback(() => {
        updateEvent() 
    }, []))

    const  updateEvent = async () =>  {
        
            const payload = {
                'distancia': '0.0',
                'latitud': '0.0',
                'longitud': '0.0',
                'favorito':false,
                'eventoActivo':false,
               'fecha':null,
                'busqueda': "",
                'categoria': null,
                'codUsuario':null
               }
    
                try {
                    const response = await fetch(`${API_BASE_URL}/api/event/filtered`, {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(payload)
                    })
        
                    if (!response.ok) {
                        throw new Error('Error al obtener los eventos')
                    }
        
                    const events = await response.json()
                    setEvents(events)
    
                    
        
                } catch (error) {
                    console.log('Error: ', error)
                } finally {
                    setLoading(false)
                }
            
    }

    if(loading) {
        return (
            <View style= {styles.loading}>
                <ActivityIndicator size='large' color='#551E18'/>
            </View>
        )
    }
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleDeleteButton= () => {
        setLongPressActive(!longPressActive);
    }

    const handleDelete = async () => {
        for (const eventId of selectedItems) {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/event/delete/${eventId}`,
                    {
                        method: "DELETE",
                        
                    }
                );
            } catch (error) {
                console.log("Error al eliminar evento: ", error);
                Alert.alert("Error", "No se pudo eliminar el evento.");
            }
        }
        Alert.alert(
            "Eliminado",
            `Eliminación finalizada`
        );

        updateEvent();
        setSelectedItems([]);
        setLongPressActive(false);
        toggleModal();
    };

    const handleCancel = () => {
        setSelectedItems([]);
        setLongPressActive(false);
    };

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <View style={styles.containers}>
            <View style={styles.headerContainer}>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.buttonAdd}
                        onPress={() => navigation.navigate("eventForm")}
                    >
                        <Ionicons name='add' size={25} color='gray' style={styles.icon} />Agregar
                    </Button> 
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.buttonDelete}
                        onPress={ handleDeleteButton }
                    >
                        <Ionicons name={ (!longPressActive) ? 'trash':'backspace' } size={20} color='gray' style={styles.icon} />
                    </Button> 
                </View>
                <View style={styles.searchContainer}>
                    <Search events = {events} setEvents= {setEvents}/>
                </View>
            </View>
            
            <ScrollView>
                <View style={styles.row}>
                    <Row
                        longPressActive={longPressActive}
                        setLongPressActive={setLongPressActive}
                        selectedItems={selectedItems}
                        handleCheckboxChange={handleCheckboxChange}
                        data={events}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
            {longPressActive && (
                <View style={styles.actionButtons}>
                    <Button
                        title="Eliminar"
                        onPress={toggleModal}
                        color={"#a23c33"}
                        buttonStyle={styles.button}
                    />
                    <Button
                        title="Cancelar"
                        onPress={handleCancel}
                        color={"#e48d85"}
                    />
                </View>
            )}
            <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
                <Text style={styles.modalText}>
                    ¿Estás seguro de que deseas eliminar los elementos
                    seleccionados?
                </Text>
                <View style={styles.modalButtons}>
                    <Button
                        title="Eliminar"
                        color={"#a23c33"}
                        onPress={handleDelete}
                    />
                    <Button
                        title="Cancelar"
                        color={"#e48d85"}
                        onPress={toggleModal}
                    />
                </View>
            </Modal>
        </View>
    );
};

const Row = ({
    longPressActive,
    setLongPressActive,
    selectedItems,
    handleCheckboxChange,
    data,
    navigation,
}) => {
    const handleLongPress = () => {
        setLongPressActive(true);
    };

    const categoria = {
        1:'Celebraciones Folcloricas',
        4:'Festivales Tradicionales',
        3:'Lugares Turisticos',
        2:'Museos',
        5:'Exposiciones de Arte',
        6:'Ferias Artesanales'
    }

    return (
        <>
            {(data) && data.map((item, index) => (
                <ListItem
                    key={item.codEvento}
                    containerStyle={styles.row}
                    onLongPress={handleLongPress}
                >
                    {longPressActive && (
                        <CheckBox
                            checked={selectedItems.includes(item.codEvento)}
                            onPress={() => handleCheckboxChange(item.codEvento)}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#a23c33"
                        />
                    )}
                    <Avatar rounded source={{uri: item.imagenes[0].urlImagen}} size={45} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>
                            {item.nombreEvento}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: "#3c1613" }}>
                            {categoria[item.idTipoEvento]}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon
                        type="font-awesome-5"
                        name="pen"
                        size={20}
                        color={"#86352e"}
                        onPress={() =>
                            {   
                                return navigation.navigate("editar", { "idEvent": item })   
                            }
                            
                        }
                    />
                </ListItem>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        fontWeight:"bold",
        color:"white",
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent: "space-between",
        padding:10,
    },
    containers: {
        flex: 1,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    row: {
        height: "auto",
        justifyContent: "space-around",
        backgroundColor:'#fdf5ef'
    },
    searchContainer: {

    },
    text: {
        color: "black",
        fontWeight: "bold",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#f8f8f8",
    },

    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: 'black',
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        shadowColor: "#3c1613",
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    loading: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonAdd: {
        width: 100,
        height: 40,
        alignItems: "center",
        backgroundColor:'rgba(14, 113, 226, 1)',
        borderRadius: 5,
    },
    buttonContainer: {
        with:'100%',
        height:50,
        alignItems:'center',
    },
    buttonDelete: {
        width: 40,
        height: 40,
        alignItems: "center",
        backgroundColor:'#b84b50',
        borderRadius: 5,
    },
});

export default GestorEventos;
