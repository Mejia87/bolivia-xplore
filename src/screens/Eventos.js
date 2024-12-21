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
        return (
            <TouchableOpacity style={styles.card} onPress={handlePressimage}>
                <Image source={{uri:evento.imagenes[0].urlImagen}} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={[styles.title2, { fontSize: RFPercentage(1.5) }]}>
                        {evento.nombreEvento}
                    </Text>
                    <View style= {[ styles.containerView ]}>
                        <View style={styles.icon}>
                            <Ionicons name='location' size={width * 0.04} color={"white"}  /> 
                        </View>
                        <Text
                            style={[styles.subtitle, { fontSize: RFPercentage(1.4) }]}
                        >
                            {evento.ubicacion}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

const Eventos = ({ navigation }) => {
    const route = useRoute()
    const {idEvent,title} = route.params
     
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/category/${idEvent}`);
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
            
         <Text style= {{fontSize:20,paddingTop:10,paddingBottom:10,fontWeight:"bold"}}>{title}</Text>
            <FlatList
                data={category}
                renderItem={({ item }) => (
                    <ImageCard
                        evento={item}
                        navigation={navigation}
                        
                    />
                )}
                keyExtractor={(item, index) => item.codEvento}
                numColumns={2} 
                contentContainerStyle={styles.container}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
        //flexWrap:"wrap",
        padding: 5,
        justifyContent: "center",
        
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: width / 2.5 , 
        height: (width / 2.5) * 1.5, 
        margin: 10,
        borderRadius: 5,
        overflow: "hidden",
        objectFit: "cover",
        overflow: "hidden",
    },
    image: {
        width: "auto",
        height: "100%",
    },
    conta: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon:{
        height:"100%",
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
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems: "center",
        flex: 10,
        position: "absolute",
        width:"100%",
        height: "100%",     
    },
    title:{
        fontSize: 30,
        fontWeight: "bold", 
    },
    subtitle: {
        color: "white",
        width: "100%",
        alignItems:"center",
        justifyContent:"center",
    },
    containers: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    title2: {
        padding:10,
        fontWeight: "bold",
        color: "white",
        textAlign:"center",
        width: "100%",
        backgroundColor: "rgba(90, 17, 17, 0.61)"
    },
    input: {
        flex: 1,
        border: "white",
    },
    loading: {
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    }, containerView:{
        backgroundColor: "rgba(90, 17, 17, 0.61)",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
});

export default Eventos;
