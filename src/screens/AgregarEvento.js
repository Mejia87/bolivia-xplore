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
    Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import MapView, { Circle, Marker, Polyline, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ModalMap from "../components/Modal";


import Mapa from "./Mapa";
import { Button } from "react-native-elements";

import { API_BASE_URL } from "@env";

const EventForm = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [images, setImages] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState("");
    const [history, setHistory] = useState("");
    const [showHistory, setShowHistory] = useState(true);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [permanent, setPermanent] = useState(false);

    const [visible, setVisible] = useState(false);

    const [location, setLocation] = useState(null);
    const [adress, setAdress] = useState("seleccione ubicación");

    const [visibleLoading, setVisibleLoading] = useState(false);

    const url = `${API_BASE_URL}/api/event/register`;
    let apiUrl = `${API_BASE_URL}/api/event/registerimage/`;

    const handleCategoryChange = (value) => {
        setCategory(value);

        if (value === "6") {
            setShowHistory(false);
            setHistory("");
        } else {
            setShowHistory(true);
        }
    };

    const getEventTypeText = () => {
        if (permanent) {
            if (!startDate && !endDate) {
                return "Este es un evento permanente.";
            }
            if (startDate && endDate) {
                return "Este es un evento semipermanente.";
            }
        }
        if (!permanent && startDate && endDate) {
            return "Este es un evento temporal.";
        }
        return "Indique las fechas y tipo de evento: ";
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
            allowsMultipleSelection: true,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUris([
                ...imageUris,
                ...result.assets.map((asset) => asset.uri),
            ]);
            setImages([...images, ...result.assets]);
        }
    };

    const handleRemoveImage = (uri) => {
        setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
        setImages(images.filter((image) => image.uri !== uri));
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
        console.log("pasa por 1")
        const formData = new FormData();
        console.log("pasa por 2"+ location);
        const eventData = {
            nombreEvento: name,
            descripcionEvento: description,
            ubicacion: adress,
            historiaEvento: history,
            fechaInicioEvento: startDate,
            fechaFinEvento: endDate,
            latitud: location.latitude,
            longitud: location.longitude,
            permanente: permanent,
            idTipoEvento: {
                idTipoEvento: category,
            },
        };
        console.log("pasa por 3")
        console.log("evento registrado", eventData);

        imageUris.forEach((imageUri) => {
            const fileName = imageUri.split("/").pop(); // Obtener el nombre del archivo
            const fileType = fileName.split(".").pop();

            formData.append("images", {
                uri: imageUri,
                type: `image/${fileType}` || "image/jpeg",
                name: fileName || "image.jpg", // Asegúrate de que los archivos tengan nombre
            });
        });
        setVisibleLoading(true);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(eventData),
            });

            console.log(response);
            if (!response.ok) {
                throw new Error(
                    `Error en la solicitud: ${response.statusText}`
                );
            }

            const result = await response.json();
            const codEvent = result.codEvento;

            apiUrl = apiUrl + codEvent;

            console.log("api url", apiUrl);

            const res = await fetch(apiUrl, {
                method: "POST",

                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Error en la solicitud: ${res.statusText}`);
            }
            setVisibleLoading(false);
            Alert.alert("Guardado", "El evento ha sido registrado con éxito.");
            navigation.goBack();

        } catch (error) {
            console.error("Error al enviar el evento:", error);
            Alert.alert("Error", "No se pudo registrar el evento");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.label}>Categoria del Evento</Text>
            <Picker
                selectedValue={category}
                onValueChange={handleCategoryChange}
                style={styles.input}
            >
                <Picker.Item
                    id="0"
                    label="Seleccione una categoría"
                />
                <Picker.Item
                    id="1"
                    label="Celebraciones Folkloricas"
                    value="1"
                />
                <Picker.Item
                    id="2"
                    label="Festivales Tradicionales"
                    value="4"
                />
                <Picker.Item
                    id="3"
                    label="Lugares Turisticos"
                    value="3"
                />
                <Picker.Item
                    id="4"
                    label="Museos"
                    value="2"
                />
                <Picker.Item
                    id="5"
                    label="Expocicion de Arte"
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
                <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color="#551E18"
                />
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={new Date(0)}
                    mode="date"
                    display="default"
                    minimumDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                    }
                    onChange={(event, date) => {
                        setShowStartDatePicker(false);
                        if (event.type === "set" && date) {
                            setStartDate(date);
                        } else {
                            setStartDate(null);
                        }
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
                <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color="#551E18"
                />
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 2))}
                    onChange={(event, date) => {
                        setShowEndDatePicker(false);
                        if (event.type === "set" && date) {
                            setEndDate(date);
                        } else {
                            setEndDate(null);
                        }
                    }}
                />
            )}

            <View style={styles.row}>
                <Text style={styles.eventPermanentText}>Evento permanente</Text>
                <TouchableOpacity
                    style={[
                        styles.circleButton,
                        permanent && styles.circleButtonSelected, 
                    ]}
                    onPress={() => setPermanent(!permanent)} 
                />
            </View>

            <Text style={styles.label}>Ubicación del Evento</Text>
            <TouchableOpacity style={styles.locationButton} onPress={() => { setVisible(true) }}>
                <MaterialIcons
                    name="location-on"
                    size={24}
                    color="#551E18"
                />
                <MapLocation
                    visible={ visible }
                    setVisible={ setVisible }
                    location={ location }
                    setLocation ={ setLocation }
                    setAdress={ setAdress }
                />
                <Text style={styles.locationText}>{adress}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Descripción del Evento</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Ingrese la descripción del evento..."
                multiline
                value={description}
                onChangeText={setDescription}
            />

            {showHistory && (
                <>
                    <Text style={styles.label}>Historia del Evento</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Ingrese la historia del evento..."
                        multiline
                        value={history}
                        onChangeText={setHistory}
                    />
                </>
            )}

            <Text style={styles.label}>Tipo de Evento</Text>
            <Text style={styles.eventTypeText}>{getEventTypeText()}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelText}>Cancelar</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>Registrar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={visibleLoading}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textLoading}>Registrando Evento</Text>
                        <View style={styles.loadingModal}>
                            <ActivityIndicator size="large" color="#b84b50" />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

function MapLocation({
    visible,
    setVisible,
    location,
    setLocation,
    setAdress,
}) {
    const [newRegion, setNewRegion] = useState(null);

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

                let currentLocation = await Location.getCurrentPositionAsync(
                    {}
                );
                setNewRegion({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });

            })();
        }
    }, [visible]);

    const confirmLocation = async () => {
        setLocation(newRegion);
        const [addressCurrent] = await Location.reverseGeocodeAsync(location);
        if (addressCurrent) {

            const region = addressCurrent.region + ',' || ""
            const subRegion = addressCurrent.subregion || ""
            let city = ""
            if (addressCurrent.city) {
                city = '-' + addressCurrent.city

            }
            const regionText = `${region} ${subRegion} ${city} `;
            console.log('region obtenida', addressCurrent)
            setAdress(regionText);
        }
        console.log("Ubicación guardada:", location);
        setVisible(false);
    };

    return (
        
        <ModalMap isVisible={visible} setIsVisible={setVisible}>
            {newRegion ? (
                <View style={{ height: "90%" }}>
                    <MapView
                        style={{ height: "100%" }}
                        initialRegion={{
                            latitude: newRegion.latitude,
                            longitude: newRegion.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        onPress={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setNewRegion({ latitude, longitude });
                        }}
                    >
                        <Marker
                            coordinate={newRegion}
                        />
                    </MapView>
                    <View style={styles.buttonMap}>
                        <Button
                            title="guardar ubicacion"
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                            onPress={() => confirmLocation()}
                        />
                        <Button
                            title="cancelar ubicacion"
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                            onPress={() => { setVisible(false); setAdress('seleccione una ubicación') }}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </ModalMap>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#FFFFFF",
    },
    label: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 5,
        color: "#333333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#f0f0f0",
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
        borderColor: "#f0f0f0",
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
        borderColor: "#f0f0f0",
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
        borderColor: "#f0f0f0",
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
        backgroundColor: "#551E18",
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    cancelText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    saveButton: {
        backgroundColor: "#551E18",
        padding: 15,
        borderRadius: 5,
        flex: 1,
    },
    saveText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
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
        justifyContent:"space-around",
    },
    eventPermanentText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333333",
        marginLeft: 0,
        marginBottom: 10,
    },
    circleButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#333333",
        backgroundColor: "#FFFFFF",
    },
    circleButtonSelected: {
        backgroundColor: "#551E18",
    },

    eventTypeText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#555",
        marginVertical: 10,
    },

    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContainer: {
        width: 300,
        height: 150,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-around",
    },
    textLoading: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#504c4c",
    },
    loadingModal: {
        marginTop: 10,
    },

});

export default EventForm;
