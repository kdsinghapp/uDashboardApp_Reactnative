import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from "react-native";
import CustomDropdown from "../../compoent/CustomDropdown";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Keyboard } from "react-native";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import DatePickerModal from "../../compoent/DatePickerModal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function
  () {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salary: "",
    startDate: null,
    lastIncrementDate: null,
    employmentType: "",
    countryCode: "",
    position: "",
    payType: "",
    terminationDate: null,
    status: "",
    bonusEligible: "",
    notes: "",
  });

  const [showDatePicker, setShowDatePicker] = useState({
    field: "",
    visible: false,
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setForm({ ...form, [showDatePicker.field]: selectedDate });
    }
    setShowDatePicker({ field: "", visible: false });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    console.log("Form Data:", form);
    Alert.alert("Employee Saved ✅");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <StatusBarComponent />
            <CustomBackHeader menuIcon={imageIndex.back} label={"Add Employee"} />
            {/* Text Inputs */}
            {["Enter first name", "Enter last name", "Enter email address", "Enter phone number", "Enter salary amount"].map((field) => (
              <TextInput
                key={field}
                style={styles.input}
                placeholderTextColor={"#ADA4A5"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                keyboardType={
                  field === "email"
                    ? "email-address"
                    : field === "Enter phone number" || field === "Enter salary amount"
                      ? "numeric"
                      : "default"
                }
                value={form[field]}
                onChangeText={(val) => handleInputChange(field, val)}
              />
            ))}
            <DatePickerModal
              visible={showDatePicker.visible}
              mode={showDatePicker?.mode || "date"} // default date
              value={form[showDatePicker.field] || new Date()}
              onClose={() =>
                setShowDatePicker({ visible: false, field: "", mode: "date" })
              }
              onConfirm={(date) => {
                handleInputChange(showDatePicker.field, date);
                setShowDatePicker({ visible: false, field: "", mode: "date" });
              }}
            />

            {/* Date Pickers */}
            {[
              { field: "startDate", label: "Start Date" },
              { field: "lastIncrementDate", label: "Last Increment Date" },
              { field: "terminationDate", label: "Termination Date" },
            ].map(({ field, label }) => (
              <TouchableOpacity
                key={field}
                style={styles.dateInput}
                onPress={() => setShowDatePicker({ field, visible: true })}
              >
                <Text>
                  {form[field] ? formatDate(form[field]) : `${label} (DD/MM/YYYY)`}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Custom Dropdowns */}
            {[
              { key: "employmentType", label: "Employment Type", options: ["Full-Time", "Part-Time", "Contract"] },
              { key: "countryCode", label: "Country Code", options: ["+91", "+1", "+44"] },
              { key: "position", label: "Position", options: ["Manager", "Developer", "Designer"] },
              { key: "payType", label: "Pay Type", options: ["Hourly", "Monthly"] },
              { key: "status", label: "Status", options: ["Active", "Inactive"] },
              { key: "bonusEligible", label: "Bonus Eligible", options: ["Yes", "No"] },
            ].map(({ key, label, options }) => (
              <CustomDropdown
                key={key}
                label={label}
                options={options}
                value={form[key]}
                onSelect={(val) => handleInputChange(key, val)}
              />
            ))}

            {/* Notes */}
            <TextInput
              style={[styles.input, {
                height: 80, borderColor: "#EAEAEA",
                borderWidth: 1,
              }]}
              placeholder="Notes"
              multiline
              value={form.notes}
              onChangeText={(val) => handleInputChange("notes", val)}
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Employee</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    height: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    height: 50,

  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
