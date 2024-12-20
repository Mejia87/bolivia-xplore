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
import { createComponentForStaticNavigation, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import Modal from "../components/Modal";
import Mapa from "./Mapa";
import { Button } from "react-native-elements";

import { API_BASE_URL } from "@env";

const EditEventForm = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { idEvent } = route.params;

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [images, setImages] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [history, setHistory] = useState("");
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [permanent, setPermanent] = useState(false)

    const [visible, setVisible] = useState(false);

    const [location, setLocation] = useState({
        latitude: -17.38265, // Coordenadas por defecto
        longitude: -66.36545,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEventById(idEvent);
    }, [idEvent]);

    const fetchEventById = async (idEvent) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/event/${idEvent}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener el evento");
            }

            const eventData = await response.json();
            console.log("Evento obtenido:", eventData);

            setName(eventData.nombreEvento);
            setCategory(eventData.idTipoEvento.toString());
            setImageUris([...eventData.imagenes.map((img) => img.urlImagen)]);
            console.log("imagenes recu:", imageUris);
            setStartDate(new Date(eventData.fechaInicioEvento));
            setEndDate(new Date(eventData.fechaFinEvento));
            setLocation(eventData.ubicacion);
            setDescription(eventData.descripcionEvento);
            setHistory(eventData.historiaEvento);
        } catch (error) {
            console.log("Error:", error);
            Alert.alert(
                "Error",
                "No se pudo cargar la información del evento."
            );
        }
    };

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
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUris([...imageUris, result.assets[0].uri]);
        }
    };

    const handleRemoveImage = (uri) => {
        setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
        console.log('imagen eliminado', imageUris)
    };

    const handleSave = async () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            Alert.alert(
                "Error",
                "El nombre solo debe contener letras y espacios."
            );
            return;
        }

        if (startDate && endDate) {
            if (endDate < startDate) {
                Alert.alert(
                    "Error",
                    "La fecha de finalización no puede ser anterior a la fecha de inicio."
                );
                return;
            }
        }

        const payload = {
            codEvento: idEvent,
            nombreEvento: name,
            descripcionEvento: description,
            ubicacion: location,
            historiaEvento: history,
            fechaInicioEvento: startDate.toISOString(),
            fechaFinEvento: endDate.toISOString(),
            latitud: -17.38256,
            longitud: -66.25364,
            permanent: false,
            idTipoEvento: { idTipoEvento: parseInt(category) },
        };

        console.log("payload", payload);

        try {
            const response = await fetch(`${API_BASE_URL}/api/event/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el evento");
            }

            Alert.alert("Éxito", "El evento se actualizó correctamente.");
            navigation.goBack();
        } catch (error) {
            console.log("Error:", error);
            Alert.alert("Error", "No se pudo actualizar el evento.");
        }
        formData = new FormData();

        imageUris.forEach((imageUri) => {
            const fileName = imageUri.split("/").pop(); // Obtener el nombre del archivo
            const fileType = fileName.split(".").pop();

            formData.append("images", {
                uri: imageUri,
                type: `image/${fileType}` || "image/jpeg",
                name: fileName || "image.jpg", // Asegúrate de que los archivos tengan nombre
            });
        });
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/event/update-image/${idEvent}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            console.log('imagenes act:', formData)
            if (!response.ok) {
                throw new Error("Error al actualizar imagen");
            }

            Alert.alert("Éxito", "la imagen se actualizó correctamente.");
        } catch (error) {
            console.log("Error:", error);
            Alert.alert("Error", "No se pudo actualizar la imagen.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Categoria del Evento</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.input}
            >
                <Picker.Item
                    id="0"
                    label="Seleccione una categoría"
                />
                <Picker.Item
                    id="1"
                    label="Festivales Tradicionales"
                    value="1"
                />
                <Picker.Item
                    id="2"
                    label="Celebraciones Folklricas"
                    value="2"
                />
                <Picker.Item
                    id="3"
                    label="Lugares Turisticos"
                    value="3"
                />
                <Picker.Item
                    id="4"
                    label="Conciertos Contemporaneos"
                    value="4"
                />
                <Picker.Item
                    id="5"
                    label="Exposiciones de Arte"
                    value="5"
                />
                <Picker.Item
                    id="6"
                    label="Ferias Artesanales"
                    value="6"
                />
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
                <MaterialIcons name="add-a-photo" size={24} color="#551E18" />
                <Text style={styles.imageText}>Añadir imágenes</Text>
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageContainer}
            >
                {imageUris.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image
                            source={{ uri: uri }}
                            style={styles.imagePreview}
                        />
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
                onPress={() => {
                    if (!permanent) setShowStartDatePicker(true);
                }}
                style={[
                    styles.dateButton,
                    permanent && { backgroundColor: "#ddd" },
                ]}
                disabled={permanent}
            >
                <Text style={styles.dateText}>
                    {startDate ? startDate.toLocaleDateString() : "d/m/a"}
                </Text>
                <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color="#551E18"
                />
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="spinner"
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                    onChange={(event, date) => {
                        setShowStartDatePicker(false);
                        if (date) setStartDate(date);
                    }}
                />
            )}

            <Text style={styles.label}>Fecha de Finalización del Evento</Text>
            <TouchableOpacity
                onPress={() => {
                    if (!permanent) setShowEndDatePicker(true);
                }}
                style={[
                    styles.dateButton,
                    permanent && { backgroundColor: "#ddd" },
                ]}
                disabled={permanent} 
            >
                <Text style={styles.dateText}>
                    {endDate ? endDate.toLocaleDateString() : "d/m/a"}
                </Text>
                <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color="#551E18"
                />
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="spinner"
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 2))}
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
                    color="#551E18"
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
            <View style={styles.row}>
                <Text style={styles.eventPermanentText}>Evento permanente</Text>
                <TouchableOpacity
                    style={[
                        styles.circleButton,
                        permanent && styles.circleButtonSelected, // Cambia estilo si está seleccionado
                    ]}
                    onPress={() => setPermanent(!permanent)} // Alterna el estado
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton}
                onPress={() => navigation.goBack()}>
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
    useEffect(() => {
        if (visible) {
            (async () => {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Permiso denegado",
                        "Se necesita permiso para acceder a la ubicación."
                    );
                    setVisible(false);
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });
            })();
        }
    }, [visible]);

    return (
        <Modal isVisible={visible} setIsVisible={setVisible}>
            {location ? (
                <View style={{ height: "90%" }}>
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
                            draggable
                            onDragEnd={(e) => {
                                const { latitude, longitude } =
                                    e.nativeEvent.coordinate;
                                setLocation({ latitude, longitude });
                            }}
                        />
                    </MapView>
                    <View style={styles.buttonMap}>
                        <Button
                            title="guardar ubicacion"
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                            onPress={() => {
                                console.log("Ubicación guardada:", location);
                                setVisible(false);
                            }}
                        />
                        <Button
                            title="cancelar ubicacion"
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                            onPress={() => setVisible(false)}
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
      fontWeight: 'bold',
      marginVertical: 5,
      color: '#333333', 
    },
    input: {
      borderWidth: 1,
      borderColor: '#f0f0f0',
      borderRadius: 5,
      padding: 12,
      marginBottom: 10,
      fontSize: 16,
      backgroundColor: '#f0f0f0', 
    },
    imageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#f0f0f0',
      padding: 12,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#f0f0f0',
    },
    imageText: {
      marginLeft: 8,
      fontSize: 16,
      color: '#333333',
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#f0f0f0',
      padding: 12,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#f0f0f0', 
    },
    dateText: {
      flex: 1,
      fontSize: 16,
      color: '#333333',
    },
    locationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#EDE0DD',
      padding: 12,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#f0f0f0', 
    },
    locationText: {
      marginLeft: 8,
      fontSize: 16,
      color: '#333333',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    cancelButton: {
      backgroundColor: '#551E18',
      padding: 15,
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
    },
    cancelText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: "#551E18",
        padding: 15,
        borderRadius: 5,
        flex: 1,
    },
    saveText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },

    loading: {
        height: "80%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonMap: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },

    viewMapBtnCancel: {
        backgroundColor: "#ba9490",
    },

    row: {
        flexDirection: "row",
    },
    eventPermanentText: {
        fontSize: 18,
        fontWeight:'500',
        color: "#333333",
        marginLeft: 90,
    },
    circleButton: {
        width: 20, 
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#333333",
        backgroundColor: "#FFFFFF",
        marginLeft: 20,
    },
    circleButtonSelected: {
        backgroundColor: "#551E18", 
    },
});

export default EditEventForm;
