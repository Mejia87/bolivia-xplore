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
import { createComponentForStaticNavigation, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ModalMap from "../components/Modal";

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
    const [showHistory, setShowHistory] = useState(true);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [permanent, setPermanent] = useState(false)

    const [visible, setVisible] = useState(false);

    const [location, setLocation] = useState(null);
    const [adress, setAdress] = useState("seleccione ubicación");

    const [visibleLoading, setVisibleLoading] = useState(false);

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
            setStartDate(eventData.fechaInicioEvento ? new Date(eventData.fechaInicioEvento) : null);
            setEndDate(eventData.fechaFinEvento ? new Date(eventData.fechaFinEvento) : null);
            setLocation({
                latitude: eventData.latitud,
                longitude: eventData.longitud,
            });
            setAdress(eventData.ubicacion);
            setDescription(eventData.descripcionEvento);
            setHistory(eventData.historiaEvento);
            setPermanent(eventData.permanente);
            setAdress(eventData.ubicacion);
            
            useEffect(() => {
            if (category === "6") {  
                setShowHistory(false);
                setHistory("");
            } else {
                setShowHistory(true);
            }
             }, [category]);

        } catch (error) {
            console.log("Error:", error);
            Alert.alert(
                "Error",
                "No se pudo cargar la información del evento."
            );
        }
    }; 

    useEffect(() => {
        if (category === "6") { 
          setShowHistory(false);
          setHistory("");
        } else {
          setShowHistory(true);
        }
      }, [category]);

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
            ubicacion: adress,
            historiaEvento: history,
            fechaInicioEvento: startDate,
            fechaFinEvento: endDate,
            latitud: location.latitude,
            longitud: location.longitude,
            permanente: permanent,
            idTipoEvento: { idTipoEvento: parseInt(category) },
        };

        console.log("payload", payload);

        let eventError = null; 
        let imageError = null; 
        let successMessage = "";
        setVisibleLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/event/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el evento");
            }

            successMessage = "El evento se actualizó correctamente.";

        } catch (error) {
            eventError = "No se pudo actualizar el evento."; 
        }

        if (imageUris.length > 0) {
            const formData = new FormData();

            imageUris.forEach((imageUri) => {
                const fileName = imageUri.split("/").pop();
                const fileType = fileName.split(".").pop();

                formData.append("images", {
                    uri: imageUri,
                    type: `image/${fileType}` || "image/jpeg",
                    name: fileName || "image.jpg",
                });
            });
            
            try {
                const imageResponse = await fetch(
                    `${API_BASE_URL}/api/event/update-image/${idEvent}`,
                    {
                        method: "PUT",
                        body: formData,
                    }
                );

                if (!imageResponse.ok) {
                    throw new Error("Error al actualizar las imágenes");
                }

                if (successMessage) {
                    successMessage += "\n";
                }
                successMessage += "Las imágenes se actualizaron correctamente.";

            } catch (error) {
                imageError = "No se pudo actualizar las imágenes.";
            }
        }

        if (eventError || imageError) {
            const errorMessage = `${eventError ? eventError : ""}\n${imageError ? imageError : ""}`;
            Alert.alert("Error", errorMessage.trim());
        } else {
            setVisibleLoading(false);
            Alert.alert("Éxito", successMessage);
            navigation.goBack();
        }
        

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
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
                    value={new Date(0)}
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
                        permanent && styles.circleButtonSelected, // Cambia estilo si está seleccionado
                    ]}
                    onPress={() => setPermanent(!permanent)} // Alterna el estado
                />
            </View>

            <Text style={styles.label}>Ubicación del Evento</Text>
            <TouchableOpacity style={styles.locationButton}>
                <MaterialIcons
                    name="location-on"
                    size={24}
                    color="#551E18"
                    onPress={() => {setVisible(true)}}
                />
                <MapLocation
                    visible={visible}
                    setVisible={setVisible}
                    location={location}
                    setLocation={setLocation}
                    setAdress={setAdress}
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
                <TouchableOpacity style={styles.cancelButton}
                onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={visibleLoading}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textLoading}>Actualizando Evento</Text>
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
    visible = false,
    setVisible = () => {},
    location = null,
    setLocation = () => {},
    setAdress = () => {},
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
                setLocation({
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
            const city = '-' + addressCurrent.city || ""
            const region = addressCurrent.region + ',' || ""
            const subRegion = addressCurrent.subregion || ""
            const regionText = `${region} ${subRegion} ${city} `;
            console.log('region obtenida', addressCurrent)
            setAdress(regionText);
        }
        console.log("Ubicación guardada:", location);
        setVisible(false);
    };

    return (
        <ModalMap isVisible={visible} setIsVisible={setVisible}>
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
                        onRegionChange={(region) => setNewRegion(region)}
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
                            onPress={() => confirmLocation()}
                        />
                        <Button
                            title="cancelar ubicacion"
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                            onPress={() => {setVisible(false); setAdress('seleccione una ubicación')}}
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
        fontWeight:'bold',
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
        marginLeft: 188,
        marginBottom: 10,
    },
    circleButtonSelected: {
        backgroundColor: "#551E18", 
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
        borderRadius: 10,
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

export default EditEventForm;
