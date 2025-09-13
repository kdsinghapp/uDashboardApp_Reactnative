import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../assets/imageIndex";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import { useRoute } from "@react-navigation/native";

const NoteDetail = () => {
  const route = useRoute()
  const item = route?.params?.item
  console.log(item)
  return (
    <SafeAreaView edges={['top']} style={{
      flex:1,
      backgroundColor:"white"
    }}>
      <View style={{
        marginHorizontal:12
      }}>
             <CustomBackHeader menuIcon={imageIndex.back} label={"Note Detail"} /> 
             </View>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

      {/* Task Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{item?.category?.name}</Text>
      </View>

      {/* Due Date */}
      <View style={styles.row}>
        <Text style={styles.label}>Callback</Text>
        <Text style={styles.value}>{item?.callback?.task_name}</Text>
      </View>

      {/* Estimated Time */}
      <View style={styles.row}>
        <Text style={styles.label}>Calendar Event Date</Text>
        <Text style={styles.value}>{item?.calendar_event_date}</Text>
      </View>

      {/* Task Manager */}
      <View style={styles.row}>
        <Text style={styles.label}>Details</Text>
        <Text style={styles.value}>{item?.details}</Text>
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

export default NoteDetail;
