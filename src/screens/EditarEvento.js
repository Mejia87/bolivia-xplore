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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { API_BASE_URL } from "@env";

const EditEventForm = () => {
    const route = useRoute();
    const { idEvent } = route.params;

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [history, setHistory] = useState("");
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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
            permanente: false,
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
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event, date) => {
                        setShowEndDatePicker(false);
                        if (date) setEndDate(date);
                    }}
                />
            )}

            <Text style={styles.label}>Ubicación del Evento</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese ubicación..."
                value={location}
                onChangeText={setLocation}
            />

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

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#FFFFFF",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
        color: "#551E18",
    },
    input: {
        borderWidth: 1,
        borderColor: "#EDE0DD",
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: "#EDE0DD",
    },
    saveButton: {
        backgroundColor: "#551E18",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    saveText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default EditEventForm;