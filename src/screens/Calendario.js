import React, { useState, useEffect, useContext, useCallback } from "react";
import { View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
  ActivityIndicator, } from "react-native";
import { useFocusEffect} from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { NavigationContext } from "../js/NavigationContext";
import {API_BASE_URL} from '@env'
import { useNavigation } from '@react-navigation/native';


const App = () => {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { setStateNavigation } = useContext(NavigationContext);
  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Inicializar useNavigation

  const fetchEventsForMonth = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/days-in-month/${year}/${month}`);
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const data = await response.json();
      const formattedDates = Object.keys(data).reduce((acc, day) => {
        const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const isPastDate = new Date(dateKey) < new Date(today);

        acc[dateKey] = {
          marked: !isPastDate && data[day].length > 0,
          dotColor: "#b84235",
          disabled: isPastDate,
          disableTouchEvent: isPastDate,
          events: data[day],
        };
        return acc;
      }, {});
       
      setMarkedDates(formattedDates);
    } catch (error) {
      Alert.alert("Error", `No se pudieron obtener los eventos. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    fetchEventsForMonth(currentYear, currentMonth);
  }, [])
  useFocusEffect(useCallback(() => {
    setStateNavigation("Calendario")

  }, []))

  useEffect(() => {
    const dayEvents = markedDates[selectedDate];
    setTasks(dayEvents?.events || []);
  }, [selectedDate, markedDates]);

  const handleDayPress = (day) => {
    if (new Date(day.dateString) < new Date(today)) {
      Alert.alert("Fecha inválida", "No puedes seleccionar días pasados.");
      return;
    }
    setSelectedDate(day.dateString);
  };

  const handleMonthChange = (month) => {
    const firstDayOfMonth = `${month.year}-${String(month.month).padStart(2, "0")}-01`;
    const isCurrentMonth =
      month.year === new Date().getFullYear() && month.month === new Date().getMonth() + 1;
    setSelectedDate(isCurrentMonth ? today : firstDayOfMonth);
    fetchEventsForMonth(month.year, month.month);
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
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié", "Jue", "Vie", "Sáb."],
    today: "Hoy",
  };
  LocaleConfig.defaultLocale = "es";

  return (
    <View style={ styles.container}>
      <Calendar
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            selectedColor: "#b84235",
          },
        }}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
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

      {loading ? (
        <ActivityIndicator size="large" color="#b84235" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.taskContainer}>
          <Text style={styles.dateText}>
            Eventos para el día de <Text style={styles.boldText}>{selectedDate}</Text>
          </Text>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.task} onPress={() =>  navigation.navigate('evento', { evento: item })}>
                  <Image
                    source={{ uri: item.imagenes[0]?.urlImagen || "https://via.placeholder.com/150" }}
                    style={styles.image}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.nombreEvento}</Text>
                    <Text style={styles.description}>{item.descripcionEvento}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noTasksText}>No hay eventos para este día.</Text>
          )}
        </View>
      )}
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
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
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
    borderRadius: 10,
  },
  noTasksText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});

export default App;
