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
import { useRoute } from '@react-navigation/native';

import {API_BASE_URL} from '@env'
import Search from '../components/Search';



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
                <Text style={[styles.title, { fontSize: RFPercentage(1.5) }]}>
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

const Eventos = ({ currentEvents}) => {
    
    
     
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => { console.log("eventos a mostrar",currentEvents)
        
    
      
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
            
        
            <FlatList
                data={currentEvents}
                renderItem={({ item }) => (
                    <ImageCard
                        evento={item}
                        navigation={navigation}
                        
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2} 
                contentContainerStyle={styles.container}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap:"wrap",
        padding: 5,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: width / 2.5 , 
        height: (width / 2.5) * 1.5, 
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
        justifyContent: "center",
        alignItems: "center",
        flex: 10,
    },
    title: {
        fontWeight: "bold",
        color: "white",
        textAlign:"center",
    },
    subtitle: {
        color: "white",
    },
    containers: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
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
