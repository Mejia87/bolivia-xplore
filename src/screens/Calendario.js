import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert, Modal, TouchableOpacity, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { NavigationContext } from "../js/NavigationContext";
import {API_BASE_URL} from '@env'

const App = () => {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { setStateNavigation } = useContext(NavigationContext);
  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null)

  const fetchEventsForMonth = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/days-in-month/${year}/${month}`);
      if (!response.ok) {
        throw new Error("Error al obtener los eventos");
      }
      const data = await response.json();
      

      setEvents(data)

      
      const formattedDates = Object.keys(data).reduce((acc, day) => {
        const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        acc[dateKey] = {
          selected: true,
          selectedColor: "#b84235",
          events: data[day], // Adjuntar los eventos directamente
        };
        return acc;
      }, {});

      setMarkedDates(formattedDates);
    } catch (error) {
      Alert.alert("Error", "No se pudieron obtener los eventos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    setStateNavigation("Calendario")
    fetchEventsForMonth(currentYear, currentMonth);
  }, []))

  useEffect(() => {
    const dayEvents = markedDates[selectedDate];
    const day = selectedDate.split("-")[2];
    
    if(events !== null && events[day]) {
      
     
      setTasks(events[day])
    }else {
      setTasks([]); 
    }
  }, [selectedDate, markedDates]);

  
  const handleEventPress = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: ["Ene.", "Feb.", "Mar", "Abr", "May", "Jun", "Jul.", "Ago", "Sep.", "Oct.", "Nov.", "Dic."],
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
    today: "Hoy",
  };
  LocaleConfig.defaultLocale = "es";

  return (
    <View style={styles.container}>
      {/* Calendario */}
      <Calendar
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: "#b84235" },
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        style={styles.calendar}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#eee9e8",
          textSectionTitleColor: "#551e18",
          todayBackgroundColor: "#551e18",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#ffffff",
          dayTextColor: "#2d4150",
          textDisabledColor: "#b84235",
          arrowColor: "black",
          textDayFontSize: 19,
          textDayHeaderFontSize: 16,
        }}
      />

      
      <View style={styles.taskContainer}>
        <Text style={styles.dateText}>Eventos para el {selectedDate}</Text>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.task} onPress={() => handleEventPress(item)}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.nombreEvento}</Text>
                  <Text style={styles.description}>{item.descripcionEvento}</Text>
                </View>
                <Image source={{ uri: item.imagenes[0].urlImagen || "https://via.placeholder.com/150" }} style={styles.image} />
                
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noTasksText}>No hay eventos para este día.</Text>
        )}
      </View>

      {/* Modal para detalles del evento */}
      <Modal visible={!!selectedEvent} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.nombreEvento}</Text>
                <Text style={styles.modalDescription}>{selectedEvent.descripcionEvento}</Text>
                <Text style={styles.modalLocation}>
                  Ubicación: {selectedEvent.ubicacion || "No especificada"}
                </Text>
                <Text style={styles.modalDates}>
                  Desde: {new Date(selectedEvent.fechaInicioEvento).toLocaleDateString()} - Hasta:{" "}
                  {new Date(selectedEvent.fechaFinEvento).toLocaleDateString()}
                </Text>
                <Button title="Cerrar" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
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
    paddingBottom: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalLocation: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555",
  },
  modalDates: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555",
  },
});

export default App;
