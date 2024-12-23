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
    ActivityIndicator,
    Dimensions,
    Modal
} from "react-native";
import { API_BASE_URL } from "@env";
import { UserContext } from "../js/UserContext";
const { width, height } = Dimensions.get("window");
const Login = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Por favor, ingrese su correo y contraseña.")
            return;
        }

        const payload = {
            email,
            password,
        };

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401) {
                setError("Datos incorrectos, intente nuevamente.");
                return;
            }

            if (response.ok) {
                const jwt = response.headers.get("Authorization");
                const usuario = await response.json();
                setUser(usuario);
                console.log("usuario", usuario);
                navigation.navigate("welcome");
            } else {
                Alert.alert("Error", "No se pudo iniciar sesión.");
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Ocurrió un problema al conectar con el servidor."
            );
        } finally {
            setLoading(false);
        }
    };

    {
        if (loading) {
            return (
                <Modal visible={loading} animationType="slide" transparent={true}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.textLoading}>Iniciando sesión</Text>
                            <View style={styles.loadingModal}>
                                <ActivityIndicator size="large" color="#b84b50" />
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        }
    }

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
            <Text style={{color:'red'}}>{error}</Text>
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
    loading:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
    },  
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
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
        width: "90%",
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

export default Login;
