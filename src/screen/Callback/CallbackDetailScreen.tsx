import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../assets/imageIndex";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const CallbackDetailScreen = () => {
  const route = useRoute()
  const item = route?.params?.item
    const formattedDate = (dateStr) => moment(dateStr).format("MMM DD, YYYY");
  
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
      <View style={{
        marginHorizontal:12
      }}>
             <CustomBackHeader menuIcon={imageIndex.back} label={"Callback Detail"} /> 
             </View>
    <ScrollView style={styles.container}>

      {/* Task Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Task Name</Text>
        <Text style={styles.value}>{item?.task_name}</Text>
      </View>

      {/* Due Date */}
      <View style={styles.row}>
        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.value}>{formattedDate(item?.end_date)}</Text>
      </View>

      {/* Estimated Time */}
      <View style={styles.row}>
        <Text style={styles.label}>Estimated Time</Text>
        <Text style={styles.value}>{item?.estimated_time}</Text>
      </View>

      {/* Task Manager */}
      <View style={styles.row}>
        <Text style={styles.label}>Task Manager</Text>
        <Text style={styles.value}>Priya Sharma</Text>
      </View>

      {/* Client */}
      <View style={styles.row}>
        <Text style={styles.label}>Client</Text>
        <Text style={styles.value}>ABC Tech Solutions</Text>
      </View>

      {/* Status */}
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <View style={[styles.tag, { backgroundColor: "#ff9800" }]}>
          <Text style={styles.tagText}>{item?.status?.name}</Text>
        </View>
      </View>

      {/* Priority */}
      <View style={styles.row}>
        <Text style={styles.label}>Priority</Text>
        <View style={[styles.tag, { backgroundColor: "#0D6EFD" }]}>
          <Text style={styles.tagText}>{item?.priority?.name}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.row}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          {item?.details}
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 4,
    fontWeight: "700",

  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#878787",
  },
  tag: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default CallbackDetailScreen;
