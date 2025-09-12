import React, { use } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const BudgetDetailScreen = () => {
  const route = useRoute()
  const item = route?.params?.item
  // console.log(item, 'this is item') 
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"white"
    }}>
      <View style={{
        marginHorizontal:12
      }}>
             <CustomBackHeader menuIcon={imageIndex.back} label={"Budget Detail"} /> 
             </View>
    <ScrollView style={styles.container}>

      {/* Task Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Category Name</Text>
        <Text style={styles.value}>{item?.category?.name}</Text>
      </View>

      {/* Due Date */}
      <View style={styles.row}>
        <Text style={styles.label}>Created Date</Text>
        <Text style={styles.value}>{moment(item?.created_at).format("MMM DD, YYYY")}</Text>
      </View>

      {/* Estimated Time */}
      <View style={styles.row}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>{item?.amount}</Text>
      </View>


     
      {/* Status */}
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <View style={[styles.tag, { backgroundColor: "#ff9800" }]}>
          <Text style={styles.tagText}>{item?.status}</Text>
        </View>
      </View>
      {/* Description */}
      <View style={styles.row}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          {item?.description}
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

export default BudgetDetailScreen;
