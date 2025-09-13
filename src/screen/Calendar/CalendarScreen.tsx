import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import CustomHeader from "../../compoent/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function CalendarScreen() {
  const [selectedView, setSelectedView] = useState("Month"); // Month, Week, Day
  const [selectedDate, setSelectedDate] = useState("");

  const markedDates = {
    "2024-04-15": { selected: true, selectedColor: "#4f6cff" },
    "2024-04-16": { selected: true, selectedColor: "#4f6cff" },
    "2024-04-17": { selected: true, selectedColor: "#4f6cff" },
    "2024-04-18": { selected: true, selectedColor: "#4f6cff" },
  };

  const renderTab = (tab) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedView === tab && styles.tabButtonActive,
      ]}
      onPress={() => setSelectedView(tab)}
    >
      <Text
        style={[
          styles.tabText,
          selectedView === tab && styles.tabTextActive,
        ]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderWeekView = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = Array.from({ length: 7 }, (_, i) => i + 15); // example
    return (
      <View style={styles.weekContainer}>
        {days.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
            <TouchableOpacity
              style={[
                styles.dayCircle,
                dates[index] === 16 && styles.dayCircleSelected,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  dates[index] === 16 && styles.dayTextSelected,
                ]}
              >
                {dates[index]}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const renderDayView = () => (
    <View style={styles.dayContainer}>
      <Text style={styles.dayTitle}>April 16, 2024</Text>
      <Text style={styles.dayContent}>Your schedule details go here...</Text>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
            <StatusBarComponent/>
      <View style={{
        padding: 15,
      }}>


      <CustomHeader  />
      </View>
      <View style={styles.tabContainer}>
        {renderTab("Month")}
        {renderTab("Week")}
        {renderTab("Day")}
      </View>

      <View style={styles.calendarContainer}>
        {selectedView === "Month" && (
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              ...markedDates,
              [selectedDate]: { selected: true, selectedColor: "#0D6EFD" },
            }}
            theme={{
              selectedDayBackgroundColor: "#0D6EFD",
              todayTextColor: "#4f6cff",
            }}
          />
        )}
        {selectedView === "Week" && renderWeekView()}
        {selectedView === "Day" && renderDayView()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  tabButtonActive: {
    backgroundColor: "#0D6EFD",
  },
  tabText: {
    color: "#333",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekDay: {
    alignItems: "center",
    width: (screenWidth - 40) / 7,
  },
  weekDayText: {
    fontSize: 12,
    marginBottom: 5,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleSelected: {
    backgroundColor: "#4f6cff",
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  dayTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  dayContainer: {
    padding: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dayContent: {
    fontSize: 16,
  },
});
