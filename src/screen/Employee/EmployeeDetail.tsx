import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../assets/imageIndex";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const EmployeeDetail = () => {
  const route = useRoute()
    const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");
  
  const item = route?.params?.item
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      <View style={{
        marginHorizontal: 12
      }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Employee Detail"} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>

        {/* Task Name */}
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{item?.first_name} {item?.last_name}</Text>
        </View>

        {/* Due Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{item?.email}</Text>
        </View>

        {/* Estimated Time */}
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{item?.country_phone_code} {item?.phone}</Text>
        </View>

        {/* Task Manager */}
        <View style={styles.row}>
          <Text style={styles.label}>Position</Text>
          <Text style={styles.value}>Senior Software Engineer</Text>
        </View>

        {/* Client */}
        <View style={styles.row}>
          <Text style={styles.label}>Start Date </Text>
          <Text style={styles.value}>{formattedDate(item?.start_date)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Termination Date</Text>
          <Text style={styles.value}>{item?.termination_date && formattedDate(item?.termination_date)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Increment Date</Text>
          <Text style={styles.value}>{formattedDate(item.last_increment_date)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Salary</Text>
          <Text style={styles.value}>{item?.salary}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pay Type</Text>
          <Text style={styles.value}>{item?.pay_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Employment Type</Text>
          <Text style={styles.value}>{item?.employment_type}</Text>
        </View>

        {/* Status */}
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <View style={[styles.tag, { backgroundColor: "#34C759" }]}>
            <Text style={styles.tagText}>{item?.status}</Text>
          </View>
        </View>

        {/* Priority */}
        <View style={styles.row}>
          <Text style={styles.label}>Bonus Eligible</Text>
          <View style={[styles.tag,]}>
            <Text style={[styles.tagText, {
              color: "gray"
            }]}>{item?.bonus_eligible ? "Yes": "No"}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.row}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>
           {item?.notes}
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

export default EmployeeDetail;
