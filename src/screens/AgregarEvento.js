import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import MapView, { Circle, Marker, Polyline, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import Modal from "../components/Modal";
import Mapa from "./Mapa";
import { Button } from "react-native-elements";

//import API_BASE_URL from '@env'

const EventForm = () => {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState("");
    const [history, setHistory] = useState("");
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [visible, setVisible] = useState(false);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    // const url = `${API_BASE_URL}/api/event/register`

    const formData = new FormData();

    const eventData = {
        nombreEvento: name,
        descripcionEvento: description,
        ubicacion: "Parque Central",
        historiaEvento: history,
        fechaInicioEvento: startDate,
        fechaFinEvento: endDate,
        latitud: 1000,
        longitud: 1200,
        idTipoEvento: {
            idTipoEvento: category,
        },
    };

    // formData.append('event',JSON.stringify(eventData))

    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   });

    //   const result = await response.json()
    //   console.log('Respuesta del servidor:', result)
    // } catch (error) {
    //   console.error('Error al enviar el evento:', error)
    // }

    const handleImagePick = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permiso denegado",
                "Se necesita permiso para acceder a las fotos."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUris([
                ...imageUris,
                ...result.assets.map((asset) => asset.uri),
            ]);
        }
    };

    const handleRemoveImage = (uri) => {
        setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
    };

    const handleSave = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        console.log(eventData);
        console.log("imagenes cargadas", imageUris);

        if (!nameRegex.test(name)) {
            Alert.alert(
                "Error",
                "El nombre solo debe contener letras y espacios."
            );
            return;
        }

        if (startDate && endDate) {
            const today = new Date();
            if (startDate < today || endDate < today) {
                Alert.alert(
                    "Error",
                    "Las fechas deben ser desde hoy en adelante."
                );
                return;
            }
            if (endDate < startDate) {
                Alert.alert(
                    "Error",
                    "La fecha de finalización no puede ser anterior a la fecha de inicio."
                );
                return;
            }
        }

        Alert.alert("Guardado", "Evento guardado con éxito");
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.label}>Categoria del Evento</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.input}
            >
                <Picker.Item id="1" label="Seleccione una categoría" />
                <Picker.Item
                    id="2"
                    label="Celebraciones Folkloricas"
                    value="1"
                />
                <Picker.Item id="3" label="Ferias Tradicionales" value="2" />
                <Picker.Item
                    id="4"
                    label="Conciertos Contemporaneos"
                    value="3"
                />
                <Picker.Item id="5" label="Expociones de Arte" value="4" />
                <Picker.Item id="6" label="Lugares Turisticos" value="5" />
            </Picker>

            <Text style={styles.label}>Nombre del Evento</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese nombre de Evento..."
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Ingrese las Imágenes</Text>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={handleImagePick}
            >
                <MaterialIcons name="add-a-photo" size={24} color="#888" />
                <Text style={styles.imageText}>Añadir imágenes</Text>
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageContainer}
            >
                {imageUris.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.imagePreview} />
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => handleRemoveImage(uri)}
                        >
                            <MaterialIcons
                                name="close"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.label}>Fecha de Inicio del Evento</Text>
            <TouchableOpacity
                onPress={() => setShowStartDatePicker(true)}
                style={styles.dateButton}
            >
                <Text style={styles.dateText}>
                    {startDate ? startDate.toLocaleDateString() : "d/m/a"}
                </Text>
                <MaterialIcons name="calendar-today" size={24} color="#888" />
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event, date) => {
                        setShowStartDatePicker(false);
                        if (date) setStartDate(date);
                    }}
                />
            )}

            <Text style={styles.label}>Fecha de Finalización del Evento</Text>
            <TouchableOpacity
                onPress={() => setShowEndDatePicker(true)}
                style={styles.dateButton}
            >
                <Text style={styles.dateText}>
                    {endDate ? endDate.toLocaleDateString() : "d/m/a"}
                </Text>
                <MaterialIcons name="calendar-today" size={24} color="#888" />
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event, date) => {
                        setShowEndDatePicker(false);
                        if (date) setEndDate(date);
                    }}
                />
            )}

            <Text style={styles.label}>Ubicación del Evento</Text>
            <TouchableOpacity style={styles.locationButton}>
                <MaterialIcons
                    name="location-on"
                    size={24}
                    color="#888"
                    onPress={() => setVisible(true)}
                />
                <MapLocation
                    visible={visible}
                    setVisible={setVisible}
                    location={location}
                    setLocation={setLocation}
                />
                <Text style={styles.locationText}>Seleccione ubicación</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Descripción del Evento</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Ingrese la descripción del evento..."
                multiline
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Historia del Evento</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Ingrese la historia del evento..."
                multiline
                value={history}
                onChangeText={setHistory}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

function MapLocation({
    visible = false,
    setVisible = () => {},
    location = null,
    setLocation = () => {},
}) {
    if (visible) {
        useEffect(() => {
            (async () => {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    alert("Permission denied");
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            })();
        }, []);
    }

    return (
        <Modal isVisible={visible} setIsVisible={setVisible}>
            {location ? (
                <View style={{height:'90%'}}>
                    <MapView
                        style={{ height: "100%" }}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker 
                        coordinate={location}
                        draggable />
                    </MapView>
                    <View style={styles.buttonMap}>
                        <Button 
                            title='guardar ubicacion'
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                        />
                        <Button 
                            title='cancelar ubicacion'
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#FFFFFF",
    },
    label: {
        fontSize: 18,
        marginVertical: 5,
        color: "#333333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: "#f0f0f0",
    },
    imageButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#888",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
    },
    imageText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333333",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#888",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: "#333333",
    },
    locationButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#888",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
    },
    locationText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    cancelText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 5,
        flex: 1,
    },
    saveText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    loading: {
        height: "80%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonMap: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
    },
    viewMapBtnContainerSave: {
        paddingRight:5,
    },
    viewMapBtnContainerCancel: {
        paddingLeft:5,
    },
    
    
    viewMapBtnCancel: {
        backgroundColor:'#ba9490',
    }



});

export default EventForm;
