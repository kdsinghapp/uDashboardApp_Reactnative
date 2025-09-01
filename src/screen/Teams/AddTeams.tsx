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
import { SafeAreaView } from "react-native-safe-area-context";

export default function 
AddTeams() {
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
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBarComponent/>
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
        <StatusBarComponent/>
       <CustomBackHeader menuIcon={imageIndex.back} label={"Add Team"} />
      {/* Text Inputs */}
      {["Enter first name",  ].map((field) => (
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

 

      {/* Custom Dropdowns */}
      {[
        { key: "employmentType", label: "Assign Employees", options: ["Ram", "Mohan", "Kamlesh"] },
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
        style={[styles.input, { height: 80,    borderColor: "#EAEAEA",
borderWidth:1,        }]}
        placeholder="Description"
        multiline
        value={form.notes}
        onChangeText={(val) => handleInputChange("notes", val)}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    height:50,
   },
  dateInput: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    height:50,

   },
  button: {
    backgroundColor: "#0D6EFD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
