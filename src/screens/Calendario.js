import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_BASE_URL } from "@env"; 

const App = () => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Configuración del idioma del calendario
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
    monthNamesShort: ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."],
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
    today: "Hoy",
  };
  LocaleConfig.defaultLocale = "es";

  // Cargar los días con eventos
  useEffect(() => {
    const fetchMarkedDates = async () => {
      setIsLoading(true);
      console.log(API_BASE_URL)
      try {
        const response = await fetch(`${API_BASE_URL}/api/event/days-in-month/2024/12`);
        const data = await response.json();
        
        // Formatear los días para `markedDates`
        const formattedDates = data.reduce((acc, date) => {
          acc[date] = {
            marked: true,
            dotColor: "black",
          };
          return acc;
        }, {});
        setMarkedDates(formattedDates);
      } catch (error) {
        console.error("Error al cargar los días con eventos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkedDates();
  }, []);

  // Cargar eventos para la fecha seleccionada
  /* useEffect(() => {
    const fetchEventsForDate = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/event/events/days-in-month${selectedDate}`); 
        const data = await response.json();
        setEvents(data);
        console.log(data)
      } catch (error) {
        console.error("Error al cargar los eventos para la fecha:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
   

    fetchEventsForDate();
  }, [selectedDate]);
   */

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

      {/* Eventos del día */}
      <View style={styles.taskContainer}>
        <Text style={styles.dateText}>Eventos para el {selectedDate}</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#b84235" />
        ) : events.length > 0 ? (
          <FlatList
            data={events}
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
});

export default App;
