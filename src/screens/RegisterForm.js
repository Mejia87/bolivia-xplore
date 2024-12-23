import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { UserContext } from "../js/UserContext";
import * as ImagePicker from "expo-image-picker";
import { API_BASE_URL } from "@env";
import { Icon } from "@rneui/base";

const RegisterForm = (navigation) => {
    const {user, setUser} = useContext(UserContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [urlFoto, setUrlFoto] = useState(null);

    const handleRegister = async () => {
        const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        if (!nameRegex.test(name)) {
            Alert.alert(
                "Error",
                "El nombre solo puede contener letras y espacios."
            );
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Formato de correo inválido.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert(
                "Error",
                "La contraseña debe tener al menos 8 caracteres, incluir un número, una mayúscula y una minúscula."
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

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

                setUser(data)
                navigation.navigate('welcome')

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
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro de Usuario</Text>
                <View style={styles.content}>
                    {urlFoto ? (
                        <Image
                            source={{ uri: urlFoto }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <Image
                            source={require("../../assets/avatar.jpg")}
                            style={styles.imagePreview}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.imagePickerButton}
                        onPress={handlePickImage}
                    >
                        <Icon name='photo' />
                        <Text>Seleccionar Foto</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ingrese su nombre completo"
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.label}>correo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ingrese su Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ingrese su contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Text style={styles.label}>confirmar contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ingrese su contraseña"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 1,
        
    },
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
        marginTop: 10,
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
        width: "50%",
        marginTop:30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginVertical: 5,
        color: "#333333",
        alignSelf: "flex-start",
        marginLeft: 20,
    },
    imagePreview: {
        width: 250,
        height: 250,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    imagePickerButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ba9490",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
    },
});

export default RegisterForm;
