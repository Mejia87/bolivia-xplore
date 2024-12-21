import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const Card = ({ title, image, event }) => {
    

    return (
        <View style={styles.item}>
            <Pressable onPress={event}>
                <Image source={image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        maxWidth: 350,
        borderRadius: 5,
        backgroundColor: "rgba(0,0,0,0)",
        overflow: "hidden",
    },

    image: {
        width: 350,
        height: 95,
        borderRadius: 10,
    },
    textContainer: {
        width: 350,
        marginTop: -20,
        justifyContent: "center",
        backgroundColor: "rgba(108, 106, 108, 0.8)",
        alignItems: "center",
        height: 20,
    },
    text: {
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
        alignItems: "center",
    },
});

export default Card;
