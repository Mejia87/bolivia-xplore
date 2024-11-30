import React,{useState, useEffect} from 'react'
import { enableScreens } from 'react-native-screens'
import {
    TextInput,
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import data from '../data/data'
import { Ionicons } from "@expo/vector-icons"

import {API_BASE_URL} from '@env'



enableScreens()
const { width, height } = Dimensions.get("window")

const ImageCard = ({evento, navigation}) => {
    const handlePressimage = () => {
         navigation.navigate("evento",{evento});
     }

     console.log('evento obtenido', evento)
    return (
        <TouchableOpacity style={styles.card} onPress={handlePressimage}>

            <Image source={{uri:evento.imagenes[0].urlImagen}} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={[styles.title, { fontSize: RFPercentage(1) }]}>
                    {evento.nombreEvento}
                </Text>
                <Text
                    style={[styles.subtitle, { fontSize: RFPercentage(0.7) }]}
                >
                    {evento.ubicacion}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const Eventos = ({ navigation }) => {
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/category/${1}`);
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }

            const data = await response.json();
            setCategory(data);

          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchCategory()
      }, [])
    
      if (loading) {
            return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#551E18" />
            </View>
            );
        }

    return (
        <View style={styles.containers}>
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="gray"
                    style={styles.icon}
                />
                <TextInput
                    style={[styles.input, { fontSize: width * 0.04 }]} 
                    placeholder="Buscar evento"
                    placeholderTextColor="gray"
                />
            </View>

            <FlatList
                data={category}
                renderItem={({ item }) => (
                    <ImageCard
                        evento={item}
                        navigation={navigation}
                        
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={3} 
                contentContainerStyle={styles.container}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: width / 3 - 20, 
        height: (width / 3 - 20) * 1.5, 
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "rgba(108, 106, 108, 1)",
    },
    image: {
        width: "100%",
        height: "80%",
    },
    conta: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconTopRight: {
        position: "absolute",
        top: 10, 
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 5,
    },
    iconBottomLeft: {
        position: "absolute",
        bottom: "25%", 
        left: 10,
        width: 24,
        height: 24,
        borderRadius: 5,
    },
    textContainer: {
        padding: "7%",
    },
    title: {
        fontWeight: "bold",
        color: "white",
    },
    subtitle: {
        color: "white",
    },
    containers: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 20,
        width: 300,
        borderColor: "#000",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    icon1: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        border: "white",
    },
    loading: {
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default Eventos;
