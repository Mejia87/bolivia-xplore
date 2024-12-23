import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { API_BASE_URL } from "@env";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authProvider, setAuthProvider] = useState("");
    const [urlFoto, setUrlFoto] = useState(null);

    const handleRegister = async () => {
        // if (!email.includes("@")) {
        //     Alert.alert("Error", "Formato de email inválido.");
        //     return;
        // }

        // if (
        //     [name, email, urlFoto, googleID, authProvider].some(
        //         (field) => field.length > 100
        //     )
        // ) {
        //     Alert.alert(
        //         "Error",
        //         "Todos los campos deben tener menos de 100 caracteres."
        //     );
        //     return;
        // }

        const payload = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 400) {
                Alert.alert("Error", "Revisa los datos ingresados.");
                return;
            }

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    "Éxito",
                    `Usuario registrado: ${data.nombreUsuario}`
                );
            } else {
                Alert.alert("Error", "No se pudo completar el registro.");
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Ocurrió un problema al conectar con el servidor."
            );
        }
    };

    const handlePickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permiso requerido",
                "Se necesita acceso a las fotos para seleccionar una imagen."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setUrlFoto(result.assets[0].uri);
            Alert.alert("Éxito", "Foto seleccionada correctamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Usuario</Text>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.imagePickerButton}
                    onPress={handlePickImage}
                >
                    <Text style={styles.imagePickerText}>Seleccionar Foto</Text>
                </TouchableOpacity>
                {urlFoto ? (
                    <Image
                        source={{ uri: urlFoto }}
                        style={styles.previewImage}
                    />
                ) : null}

                <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
    },
    content: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        marginTop: 50,
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        width: "90%",
    },
    button: {
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: "#b84b50",
        borderRadius: 5,
        width: "60%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RegisterForm;
