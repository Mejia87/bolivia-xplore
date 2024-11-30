import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react"

const Search = () => {
    return (
        <View style={styles.searchContainer}>
            <Ionicons
                name="search"
                size={20}
                color="gray"
                style={styles.icon}
                
            />
            <TextInput
                style={styles.input}
                placeholder="Buscar evento"
                placeholderTextColor="gray"
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection:'row-reverse',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 20,
        width: 300,
        borderColor: '#000', 
        borderWidth: 2, 
        alignItems:'center',
        justifyContent:'center',
    
      },
      
      input: {
        flex: 1,
        fontSize: 16,
      },
});
