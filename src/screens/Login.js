import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { API_BASE_URL } from "@env";
import { UserContext } from "../js/UserContext";

const Login = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor, ingrese su correo y contraseña.");
            return;
        }

        const payload = {
            email,
            password,
        }; 

        try {
            const response = await fetch(`${API_BASE_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401) {
                Alert.alert("Error", "Datos incorrectos, intente nuevamente.");
                return;
            }

            if (response.ok) {
                const jwt = response.headers.get("Authorization");
                Alert.alert("Éxito", "Inicio de sesión exitoso.");
                const usuario = await response.json();
                setUser(usuario)
                console.log('usuario', usuario)
                navigation.navigate('welcome')

            } else {
                Alert.alert("Error", "No se pudo iniciar sesión.");
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Ocurrió un problema al conectar con el servidor."
            );
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>BoliviaXplore</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert('Función Google en desarrollo')}> 
        <Image
          source={require("../../assets/google.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>*/}

            <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={styles.registerText}>
                    ¿No tienes una cuenta? Registrarse
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
        alignItems:'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        width:'90%'
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4285F4",
        borderRadius: 5,
        height: 50,
        marginTop: 15,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
    },
    registerText: {
        marginTop: 20,
        color: "#4285F4",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    buttonLogin: {
      justifyContent:"flex-end",
      paddingVertical: 10,
      paddingHorizontal: 40,
      backgroundColor: '#b84b50',
      borderRadius: 5,
      width:'60%'
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent:"center",
      alignItems:"center",
    },
});

export default Login;
