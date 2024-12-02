import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Calendar,LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";

const App = () => {
  const today = new Date().toISOString().split("T")[0]; // Obtener la fecha actual en formato YYYY-MM-DD


  const events = {
    "2024-11-26": [
      {
        title: "Virgen de urkupiña",
        description: "pequeña info de la evento",
        image: "https://torreciudad.org/wp-content/uploads/2007/10/Virgen-de-Urkupina-Quillacollo-Bolivia-e1618670269796.jpg",
        isFavorite: true,
      },
      {
        title: "Evento titulo",
        description: "Descripcion titulo.",
        profiler: require("./urkupiña.png"),
        isFavorite: false,
      },
    ],
    "2024-11-23": [
      {
        title: "Virgen del carmen",
        description: "pequeña info de la evento",
        image: "https://torreciudad.org/wp-content/uploads/2007/10/Virgen-de-Urkupina-Quillacollo-Bolivia-e1618670269796.jpg",
        isFavorite: true,
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(today); 
  const [tasks, setTasks] = useState(events[today] || []); 


  useEffect(() => {
    setTasks(events[selectedDate] || []);
  }, [selectedDate]);


  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: "black",
      selected: date === selectedDate,
      selectedColor: '#b84235',
    };
    return acc;
  }, {});

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
    today: "Hoy"
  };
  LocaleConfig.defaultLocale = 'es';

  return (
    <View style={styles.container}>
      {/* Calendario */}
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#eee9e8',
          textSectionTitleColor: '#551e18',
          todayBackgroundColor: '#551e18',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          dayTextColor: '#2d4150',
          textDisabledColor: '#b84235',
          arrowColor:"black",
          textDayFontSize: 19, // Cambiar el tamaño de los números
          textDayHeaderFontSize: 16,
        }}
      />

      {/* Eventos del día */}
      <View style={styles.taskContainer}>
        <Text style={styles.dateText}>Eventos para el  {selectedDate}</Text>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.task}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Icon
                  name={item.isFavorite ? "star" : "star-outline"}
                  size={24}
                  color="gold"
                />
              </View>
            )}
          />
        ) : (
          <Text style={styles.noTasksText}>No hay eventos para este día.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  calendar: {
    marginBottom: 20,
  },
  taskContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom:10,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  noTasksText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});

export default App;
