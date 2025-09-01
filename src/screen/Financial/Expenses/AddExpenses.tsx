import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import CustomDropdown from "../../../compoent/CustomDropdown";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../../compoent/DatePickerModal"; // import modal

export default function AddExpenses() {
  const [form, setForm] = useState({
    task: "",
    details: "",
    callback: "",
    calendarDate: new Date(),
    tags: "",
    estimateTime: "",
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    priority: "",
    status: "",
  });

  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date" as "date" | "time",
  });

  // Sample options for dropdowns
  const callbackOptions = ["Ram", "Kamlesh"];
  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions = ["Pending", "In Progress", "Completed"];

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const openDatePicker = (field: string, mode: "date" | "time" = "date") => {
    setShowDatePicker({ visible: true, field, mode });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Add Expenses"} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >

            {/* <Text style={styles.label}>Category</Text>
          <CustomDropdown
            label="Select Category"
            options={priorityOptions}
            value={form.priority}
            onSelect={(val) => handleChange("priority", val)}
          /> */}

          {/* Task */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={form.task}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("name", text)}
          />

          {/* Client */}
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter Budget detail"
            multiline
            value={form.details}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("details", text)}
          />

       </ScrollView>
       </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    height: 55,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0D6EFD",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
