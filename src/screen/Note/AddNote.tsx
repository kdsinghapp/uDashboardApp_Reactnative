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
import CustomDropdown from "../../compoent/CustomDropdown";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../compoent/DatePickerModal"; // ✅ import modal

export default function AddNoteScreen() {
  const [form, setForm] = useState({
    task: "",
    details: "",
    category: "",
    callback: "",
    calendarDate: new Date(),
    tags: "",
  });

  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date",
  });

  // Sample options
  const categoryOptions = ["Work", "Personal", "Shopping", "Others"];
  const callbackOptions = ["Email", "Phone", "Meeting", "None"];

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Add Note"} />
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

          {/* Details */}
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter details"
            multiline
            value={form.details}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("details", text)}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <CustomDropdown
            label="Select category"
            options={categoryOptions}
            value={form.category}
            onSelect={(val) => handleChange("category", val)}
          />

          {/* Callback */}
          <Text style={styles.label}>Callback</Text>
          <CustomDropdown
            label="Select callback"
            options={callbackOptions}
            value={form.callback}
            onSelect={(val) => handleChange("callback", val)}
          />

          {/* Calendar Event Date */}
          <Text style={styles.label}>Calendar Event Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setShowDatePicker({ visible: true, field: "calendarDate", mode: "date" })
            }
          >
            <Text>{form.calendarDate.toDateString()}</Text>
          </TouchableOpacity>

          {/* ✅ Date Picker Modal */}
          <DatePickerModal
            visible={showDatePicker.visible}
            mode={showDatePicker.mode as "date" | "time"}
            value={form[showDatePicker.field] || new Date()}
            onClose={() => setShowDatePicker({ visible: false, field: "", mode: "date" })}
            onConfirm={(date) => handleChange(showDatePicker.field, date)}
          />

          {/* Tags */}
          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="Select tags"
            value={form.tags}
            onChangeText={(text) => handleChange("tags", text)}
          />

          {/* Create Note Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create Note</Text>
          </TouchableOpacity>
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
