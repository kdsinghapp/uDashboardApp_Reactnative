import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import imageIndex from "../../../assets/imageIndex";
 

const LossDetailScren = () => {
  return (
    <SafeAreaView edges={['top']} style={{
      flex:1,
      backgroundColor:"white"
    }}>
      <View style={{
        marginHorizontal:12
      }}>
             <CustomBackHeader menuIcon={imageIndex.back} label={"Profit & Loss Detail"} /> 
             </View>
    <ScrollView style={styles.container}>

      {/* Task Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Profit & Loss Date</Text>
        <Text style={styles.value}>Website Redesign – Homepage Update</Text>
      </View>

      {/* Due Date */}
      <View style={styles.row}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>$ 100.00</Text>
      </View>
   
      {/* Status */}
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <View style={[styles.tag, { backgroundColor: "#34C759" ,    marginTop:5
}]}>
          <Text style={styles.tagText}>Pending</Text>
        </View>
      </View>

      {/* Priority */}
      <View style={styles.row}>
        <Text style={styles.label}>Priority</Text>
        <View style={[styles.tag, { backgroundColor: "#0D6EFD",    marginTop:5
 }]}>
          <Text style={styles.tagText}>Medium</Text>
        </View>
      </View>

      {/* Description */}
    
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
    marginTop:12
  },
  tag: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  tagText: {
    color: "#fff",
    fontWeight: "600",
    fontSize:12,
  },
});

export default LossDetailScren;
