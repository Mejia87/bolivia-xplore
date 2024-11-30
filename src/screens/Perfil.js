import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';

const Perfil = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.container}>
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Haz clic para {expanded ? 'ocultar' : 'mostrar'}</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.content}>
          <Text>Este es el contenido que se muestra al expandir.</Text>
        </View>
      </ListItem.Accordion>
    </View>
  );
};


//estoy modificando perfil

export default Perfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
  },
});