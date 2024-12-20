import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';

const { width, height } = Dimensions.get('window');

const MapWithCursor = ({ event, region, mapRef }) => {
  const [cursorPosition, setCursorPosition] = useState();
  const [ degAngle, setDegAngle] = useState(0); 
  const isEventInMap = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const northEast = {
      latitude: latitude + latitudeDelta / 2,
      longitude: longitude + longitudeDelta / 2,
    };
    const southWest = {
      latitude: latitude - latitudeDelta / 2,
      longitude: longitude - longitudeDelta / 2,
    };
  
    return (
      event.latitud <= northEast.latitude &&
      event.latitud >= southWest.latitude &&
      event.longitud <= northEast.longitude &&
      event.longitud>= southWest.longitude
    );
};
  const calculateCursorPosition = () => {
    const mapCenter = { latitude: region.latitude, longitude: region.longitude };

    // Calcula el ángulo entre el centro del mapa y el evento
    const angle = Math.atan2(
      event.latitud - mapCenter.latitude,
      event.longitud - mapCenter.longitude
    );

    const angleDeg = angle * (180 / Math.PI)
    console.log(angleDeg)
    setDegAngle(angleDeg)
    // Ajusta la posición del cursor en los bordes de la pantalla
    let x = width / 2 + (width / 2 - 20) * Math.cos(angle)-30;
    let y = height / 2 - (height / 2 - 10) * Math.sin(angle)-70;
    if(x<10){
        x = 10;
    } else{
        if(x>width-60){
            x = width - 60;
        }
    }
    if(y<70){
        y = 70;
    } else {
        if(y>height-170){
            y = height-170;
        }
    }


    return { x, y };
  };

  useEffect(() =>{
    setCursorPosition(calculateCursorPosition())
  },[region])

  const handlePress = () => {
    mapRef.current?.animateToRegion({
      latitude: event.latitud,
      longitude: event.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (<>
    {(cursorPosition && !isEventInMap()) ? 

      <View  key={event.codEvento} style={[styles.cursor,{ left: cursorPosition.x, top: cursorPosition.y, backgroundColor: event.color, transform: [{ rotate: `${-1*degAngle-45}deg` }]}]}> 
        <Pressable onPress={ handlePress }>
        <Image
                    source={{uri:event.imagenes[0].urlImagen}}
                    style={[styles.notificationImage,{transform: [{ rotate: `${ degAngle +45}deg` }],}]}
                  />
                  </Pressable>
      </View>
      
    : <></>}
  </>);
};

const styles = StyleSheet.create({
    notificationImage: {
        borderRadius: 40,
        width: 40,
        height: 40
      },
  cursor: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 40,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
 
  },
});

export default MapWithCursor;