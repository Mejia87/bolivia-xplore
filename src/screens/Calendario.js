import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Modal, TouchableOpacity, Button } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_BASE_URL } from "@env";

const App = () => {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);

  

  const fetchEventsForMonth = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/days-in-month/${year}/${month}`);
      if (!response.ok) {
        throw new Error("Error al obtener los eventos");
      }
      const data = await response.json();
      if (typeof data !== "object" || !data) {
        throw new Error("Formato de datos inválido");
      }

      const formattedDates = Object.keys(data).reduce((acc, day) => {
        const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        acc[dateKey] = {
          selected: true,
          selectedColor: "#b84235",
          events: data[day],
        };
        return acc;
      }, {});

      setMarkedDates(formattedDates);
      setEvents(data);
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudieron obtener los eventos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsForMonth(currentYear, currentMonth);
  }, []);

  useEffect(() => {
    if (events) {
      const day = selectedDate.split("-")[2];
      setTasks(events[day] || []);
    }
  }, [selectedDate, events]);

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
            keyExtractor={(item) => item.id.toString()} // Se usa el ID único
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.task} onPress={() => handleEventPress(item)}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.nombreEvento}</Text>
                  <Text style={styles.description}>{item.descripcionEvento}</Text>
                </View>
                <Icon
                  name={item.idFavorite && item.idFavorite.length > 0 ? "star" : "star-outline"}
                  size={24}
                  color="gold"
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noTasksText}>No hay eventos para este día.</Text>
        )}
      </View>

      <Modal visible={!!selectedEvent} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.nombreEvento || "Sin título"}</Text>
                <Text style={styles.modalDescription}>{selectedEvent.descripcionEvento || "Sin descripción"}</Text>
                <Text style={styles.modalLocation}>
                  Ubicación: {selectedEvent.ubicacion || "No especificada"}
                </Text>
                <Text style={styles.modalDates}>
                  Desde: {selectedEvent.fechaInicioEvento ? new Date(selectedEvent.fechaInicioEvento).toLocaleDateString() : "No disponible"} - Hasta: {selectedEvent.fechaFinEvento ? new Date(selectedEvent.fechaFinEvento).toLocaleDateString() : "No disponible"}
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
