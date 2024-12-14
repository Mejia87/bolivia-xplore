import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import { enableScreens } from "react-native-screens";
import React, { useState } from "react";
import Search from "../components/Search";
import { Button, Icon } from "@rneui/base";
import { CheckBox, ListItem, Avatar } from "@rneui/themed";

import data from "../data/data";
import { ScrollView } from "react-native";
import Modal from "../components/Modal";

enableScreens();

const GestorEventos = ({ navigation }) => {
    const [longPressActive, setLongPressActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleDelete = () => {
        Alert.alert(
            "Eliminado",
            `Se eliminaron ${selectedItems.length} elementos.`
        );
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
            <View style={styles.searchContainer}>
                <Search />
            </View>
            <Button title='agregar evento' buttonStyle={styles.buttonAdd}/>
            <ScrollView>
                <View style={styles.row}>
                    <Row
                        longPressActive={longPressActive}
                        setLongPressActive={setLongPressActive}
                        selectedItems={selectedItems}
                        handleCheckboxChange={handleCheckboxChange}
                        data={data}
                    />
                </View>
            </ScrollView>
            {longPressActive && (
                <View style={styles.actionButtons}>
                    <Button title="Eliminar" onPress={toggleModal} color={'#a23c33'} buttonStyle={styles.button}/>
                    <Button title="Cancelar" onPress={handleCancel} color={'#e48d85'} />
                </View>
            )}
            <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
                <Text style={styles.modalText}>
                    ¿Estás seguro de que deseas eliminar los elementos
                    seleccionados?
                </Text>
                <View style={styles.modalButtons}>
                    <Button title= 'Eliminar' color={'#a23c33'} onPress={handleDelete} />
                    <Button title= 'Cancelar' color={'#e48d85'} onPress={toggleModal} />

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
}) => {
    const handleLongPress = () => {
        setLongPressActive(true);
    };

    return (
        <>
            {data.map((item) => (
                <ListItem
                    key={item.id}
                    containerStyle={styles.row}
                    onLongPress={handleLongPress}
                >
                    {longPressActive && (
                        <CheckBox
                            checked={selectedItems.includes(item.id)}
                            onPress={() => handleCheckboxChange(item.id)}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="#a23c33"
                        />
                    )}
                    <Avatar rounded source={item.images[0].source} size={45} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>
                            {item.name}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: "#3c1613" }}>
                            {item.type}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon
                        type="font-awesome-5"
                        name="pen"
                        size={20}
                        color={"#86352e"}
                    />
                </ListItem>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    row: {
        height: "auto",
        justifyContent: "space-around",
    },
    searchContainer: {
        margin: 10,
        padding: 5,
    },
    text: {
        color: "#a23c33",
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
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        shadowColor:'#3c1613',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        elevation: 5,
    },
    
});

export default GestorEventos;
