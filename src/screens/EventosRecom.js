import React, { useState, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
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
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import { API_BASE_URL } from '@env';
import Search from '../components/Search';

enableScreens();
const { width, height } = Dimensions.get('window');

const ImageCard = ({ evento, navigation }) => {
  const handlePressimage = () => {
    navigation.navigate('evento', { evento });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePressimage}>
      <Image source={{ uri: evento.imagenes[0]?.urlImagen }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: RFPercentage(1) }]}>{evento.nombreEvento}</Text>
        <Text style={[styles.subtitle, { fontSize: RFPercentage(0.7) }]}>{evento.ubicacion}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Eventos = ({ navigation }) => {
  const route = useRoute();
  const { idUsuario, latitud, longitud } = route.params; // Asegúrate de enviar estos datos al navegar a este componente.

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/event/getrecomendation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idUsuario, latitud, longitud }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        if (Object.keys(data).length === 0) {
          setCategory([]); // Respuesta vacía, no hay eventos recomendados.
        } else {
          setCategory([data]); // Como el endpoint devuelve un solo evento, lo envolvemos en un array.
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#551E18" />
      </View>
    );
  }

  return (
    <View style={styles.containers}>
      <Search />

      <FlatList
        data={category}
        renderItem={({ item }) => <ImageCard evento={item} navigation={navigation} />}
        keyExtractor={(item) => item.codEvento.toString()}
        numColumns={3}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron eventos recomendados.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: width / 3 - 20,
    height: (width / 3 - 20) * 1.5,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(108, 106, 108, 1)',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  textContainer: {
    padding: '7%',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: 'white',
  },
  containers: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: RFPercentage(2),
    color: '#555',
  },
});

export default Eventos;
