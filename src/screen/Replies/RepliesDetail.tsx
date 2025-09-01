import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../assets/imageIndex";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";

const RepliesDetail = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      <View style={{
        marginHorizontal: 12
      }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Replies Detail"} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>

        {/* Task Name */}
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Priya Sharma</Text>
        </View>

        {/* Due Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>priya.sharma@techsolutions.com</Text>
        </View>

        {/* Estimated Time */}
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+91 9876543210</Text>
        </View>

        {/* Task Manager */}
        <View style={styles.row}>
          <Text style={styles.label}>Position</Text>
          <Text style={styles.value}>Senior Software Engineer</Text>
        </View>

        {/* Client */}
        <View style={styles.row}>
          <Text style={styles.label}>Start Date </Text>
          <Text style={styles.value}>15 Mar 2021</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Termination Date</Text>
          <Text style={styles.value}>N/A</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Increment Date</Text>
          <Text style={styles.value}>01 Apr 2024/A</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Salary</Text>
          <Text style={styles.value}>₹85,000.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pay Type</Text>
          <Text style={styles.value}>Monthly</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Employment Type</Text>
          <Text style={styles.value}>Full-time</Text>
        </View>

        {/* Status */}
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <View style={[styles.tag, { backgroundColor: "#34C759" }]}>
            <Text style={styles.tagText}>Pending</Text>
          </View>
        </View>

        {/* Priority */}
        <View style={styles.row}>
          <Text style={styles.label}>Bonus Eligible</Text>
          <View style={[styles.tag,]}>
            <Text style={[styles.tagText, {
              color: "gray"
            }]}>Yes</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.row}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>
            The task involves redesigning the homepage of the client’s corporate
            website. Key updates include:
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

export default RepliesDetail;
