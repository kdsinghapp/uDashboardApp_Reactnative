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
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomDropdown from "../../compoent/CustomDropdown";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../compoent/DatePickerModal";

export default function AddBackburner() {
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
    mode: "date",
  });

  // Sample options for dropdowns
  const callbackOptions = ["Ram", "Kamlesh"];
  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions = ["Pending", "In Progress", "Completed"];

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || form[showDatePicker.field];
    setShowDatePicker({ field: "", visible: false, mode: "date" });
    setForm({ ...form, [showDatePicker.field]: currentDate });
  };

  const renderDatePicker = (field, mode = "date") => {
    setShowDatePicker({ visible: true, field, mode });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Add Backburner"} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* Task */}
          <Text style={styles.label}>Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            value={form.task}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("task", text)}
          />

          {/* Client */}
          <Text style={styles.label}>Client</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Search Client"
            multiline
            value={form.details}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("details", text)}
          />

          {/* Employee */}
          <Text style={styles.label}>Employee</Text>
          <CustomDropdown
            label="Select Employee"
            options={callbackOptions}
            value={form.callback}
            onSelect={(val) => handleChange("callback", val)}
          />

          {/* Calendar Event */}
          <Text style={styles.label}>Calendar Event Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => renderDatePicker("calendarDate", "date")}
          >
            <Text>{form.calendarDate.toDateString()}</Text>
          </TouchableOpacity>

          {/* Estimate Time */}
          <Text style={styles.label}>Estimate Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter estimate time"
            value={form.estimateTime}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("estimateTime", text)}
          />

          {/* Start Date & Time */}
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => renderDatePicker("startDate", "date")}
          >
            <Text>{form.startDate.toDateString()}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => renderDatePicker("startTime", "time")}
          >
            <Text>{form.startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          {/* End Date & Time */}
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => renderDatePicker("endDate", "date")}
          >
            <Text>{form.endDate.toDateString()}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => renderDatePicker("endTime", "time")}
          >
            <Text>{form.endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          {/* Priority */}
          <Text style={styles.label}>Priority</Text>
          <CustomDropdown
            label="Select Priority"
            options={priorityOptions}
            value={form.priority}
            onSelect={(val) => handleChange("priority", val)}
          />

          {/* Status */}
          <Text style={styles.label}>Status</Text>
          <CustomDropdown
            label="Select Status"
            options={statusOptions}
            value={form.status}
            onSelect={(val) => handleChange("status", val)}
          />

          {/* Tags */}
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Details"
            value={form.tags}
            onChangeText={(text) => handleChange("tags", text)}
          />

          {/* Create Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create CallBack</Text>
          </TouchableOpacity>

          <DatePickerModal
  visible={showDatePicker.visible}
  mode={showDatePicker.mode as "date" | "time"}
  value={form[showDatePicker.field] || new Date()}
  onClose={() => setShowDatePicker({ visible: false, field: "", mode: "date" })}
  onConfirm={(date) => handleChange(showDatePicker.field, date)}
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
    justifyContent:"center"
  },
  iosDatePickerContainer: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
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
