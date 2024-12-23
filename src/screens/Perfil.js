import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { UserContext } from "../js/UserContext";

import BackButton from "../components/BackButton";

const UserProfileScreen = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState({ ...user });

    const handleEditToggle = () => {
        setTempUser({ ...user });
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setUser({ ...tempUser });
        setIsEditing(false);
    };

    return (
        <>
            <View style={styles.backbutton}>
            <BackButton />
            </View>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={
                            user.photo
                                ? user.photo
                                : require("../../assets/logo.png")
                        }
                        style={styles.profileImage}
                    />
                </View>

                {isEditing ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={user.nombreUsuario}
                            onChangeText={(text) =>
                                setTempUser((prev) => ({ ...prev, name: text }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            value={user.correoUsuario}
                            onChangeText={(text) =>
                                setTempUser((prev) => ({
                                    ...prev,
                                    email: text,
                                }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            value={tempUser.city}
                            onChangeText={(text) =>
                                setTempUser((prev) => ({ ...prev, city: text }))
                            }
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.username}>
                            {user.nombreUsuario}
                        </Text>
                        <Text style={styles.email}>{user.correoUsuario}</Text>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    
    
    imageContainer: {
        marginBottom: 20,
        alignItems: "center",
    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#ccc",
    },
    
    
    username: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    
    backbutton: {
      width:60,
      
    }
});

export default UserProfileScreen;
