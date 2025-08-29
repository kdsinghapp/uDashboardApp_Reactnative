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
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomDropdown from "../compoent/CustomDropdown";
 
export default function AddEmployee() {
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

  const handleSubmit = () => {
    console.log("Form Data:", form);
    alert("Employee Saved ✅");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Employee</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(val) => handleInputChange("firstName", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(val) => handleInputChange("lastName", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(val) => handleInputChange("email", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(val) => handleInputChange("phone", val)}
      />

      <TextInput
        style={styles.input}
        placeholder="Salary"
        keyboardType="numeric"
        value={form.salary}
        onChangeText={(val) => handleInputChange("salary", val)}
      />

      {/* Date Pickers */}
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker({ field: "startDate", visible: true })}
      >
        <Text>
          {form.startDate
            ? form.startDate.toDateString()
            : "Start Date (DD/MM/YYYY)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() =>
          setShowDatePicker({ field: "lastIncrementDate", visible: true })
        }
      >
        <Text>
          {form.lastIncrementDate
            ? form.lastIncrementDate.toDateString()
            : "Last Increment Date (DD/MM/YYYY)"}
        </Text>
      </TouchableOpacity>

      {/* Custom Dropdowns */}
      <CustomDropdown
        label="Employment Type"
        options={["Full-Time", "Part-Time", "Contract"]}
        value={form.employmentType}
        onSelect={(val) => handleInputChange("employmentType", val)}
      />

      <CustomDropdown
        label="Country Code"
        options={["+91", "+1", "+44"]}
        value={form.countryCode}
        onSelect={(val) => handleInputChange("countryCode", val)}
      />

      <CustomDropdown
        label="Position"
        options={["Manager", "Developer", "Designer"]}
        value={form.position}
        onSelect={(val) => handleInputChange("position", val)}
      />

      <CustomDropdown
        label="Pay Type"
        options={["Hourly", "Monthly"]}
        value={form.payType}
        onSelect={(val) => handleInputChange("payType", val)}
      />

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() =>
          setShowDatePicker({ field: "terminationDate", visible: true })
        }
      >
        <Text>
          {form.terminationDate
            ? form.terminationDate.toDateString()
            : "Termination Date (DD/MM/YYYY)"}
        </Text>
      </TouchableOpacity>

      <CustomDropdown
        label="Status"
        options={["Active", "Inactive"]}
        value={form.status}
        onSelect={(val) => handleInputChange("status", val)}
      />

      <CustomDropdown
        label="Bonus Eligible"
        options={["Yes", "No"]}
        value={form.bonusEligible}
        onSelect={(val) => handleInputChange("bonusEligible", val)}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Notes"
        multiline
        value={form.notes}
        onChangeText={(val) => handleInputChange("notes", val)}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Callback</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker.visible && (
        <DateTimePicker
          value={form[showDatePicker.field] || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fafafa",
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
