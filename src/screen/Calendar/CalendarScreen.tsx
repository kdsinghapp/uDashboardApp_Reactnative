import React, { useEffect, useState } from "react";
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
import { GetApi } from "../../Api/apiRequest";
import { useSelector } from "react-redux";
import { color } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";
import LoadingModal from "../../utils/Loader";

const screenWidth = Dimensions.get("window").width;

export default function CalendarScreen() {
  const [selectedView, setSelectedView] = useState("Month"); // Month, Week, Day
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false)
  const isLogin = useSelector((state) => state?.auth)
  const [data, setData] = useState([])
  // console.log(isLogin)
  useEffect(() => {
    getEvent()
  }, [])
  const getEvent = async (start, end) => {
    const param = {
      token: isLogin?.token,
      url: start ? `calendar?start=${start}&end=${end}` : "calendar"
    }
    console.log(param)

    const data = await GetApi(param, setLoading)

    const markedDates = data.reduce((acc, event) => {
      acc[event.start] = {
        selected: true,
        // selectedColor: event.backgroundColor || "#4f6cff",
        selectedColor: color.primary,
        event
      };
      return acc;
    }, {});
    console.log(markedDates)
    setData(markedDates)
  }
  // const markedDates = {
  //   "2025-09-15": { selected: true, selectedColor: "#4f6cff" },
  //   "2025-09-28": { selected: true, selectedColor: "#4f6cff" },
  //   "2025-09-17": { selected: true, selectedColor: "#4f6cff" },
  //   "2025-09-18": { selected: true, selectedColor: "#4f6cff" },
  // };

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
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    const eventData = data[day.dateString]?.event;

    if (eventData) {
      // Only navigate if the date is marked
      navigation.navigate(ScreenNameEnum.DayDetailsScreen, { event: eventData });
    } else {
      console.log("No events on this day");
    }
  };
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {loading && <LoadingModal/>}
      <StatusBarComponent />
      <View style={{
        padding: 15,
      }}>
        <CustomHeader />
      </View>
      {/* <View style={styles.tabContainer}>
        {renderTab("Month")}
        {renderTab("Week")}
        {renderTab("Day")}
      </View> */}

      <View style={styles.calendarContainer}>
        {selectedView === "Month" && (
          <Calendar
            onDayPress={handleDayPress}
            // onDayPress={(day) => {
            //   console.log(day.dateString)
            //   // setSelectedDate(day.dateString)

            // }}

            onMonthChange={(month) => {
              console.log("New month:", month);
              // month = {year: 2025, month: 9, day: 1}
              const startDate = `${month.year}-${month.month.toString().padStart(2, '0')}-01`;
              const endDate = `${month.year}-${month.month.toString().padStart(2, '0')}-${new Date(month.year, month.month, 0).getDate()}`;

              // Call your API with start and end date
              getEvent(startDate, endDate);
            }}
            markedDates={{
              ...data,
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
