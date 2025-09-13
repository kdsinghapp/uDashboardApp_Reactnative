import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import CustomDropdown from "../../compoent/CustomDropdown";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import DatePickerModal from "../../compoent/DatePickerModal";
import { useSelector } from "react-redux";
import { AddEmployApi, UpdateEmployApi } from "../../Api/apiRequest";

const options = [
  {
    key: "employmentType",
    label: "Employment Type",
    options: [
      { label: "Full-Time", value: "full_time" },
      { label: "Part-Time", value: "part_time" },
      { label: "Contract", value: "contract" },
    ],
  },
  {
    key: "countryCode",
    label: "Country Code",
    
    options: [
      { label: "🇮🇳 India (+91)", value: "+91" },
  { label: "🇺🇸 USA (+1)", value: "+1" },
  { label: "🇬🇧 UK (+44)", value: "+44" },
  { label: "🇦🇺 Australia (+61)", value: "+61" },
  { label: "🇨🇦 Canada (+1)", value: "+1" },
    ],
  },
  {
    key: "position",
    label: "Position",
    options: [
      { label: "Manager", value: "manager" },
      { label: "Developer", value: "developer" },
      { label: "Designer", value: "designer" },
    ],
  },
  {
    key: "payType",
    label: "Pay Type",
    options: [
      { label: "Hourly", value: "hourly" },
      { label: "Monthly", value: "monthly" },
    ],
  },
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    key: "bonusEligible",
    label: "Bonus Eligible",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
]
export default function EmployeeForm({ route, navigation }) {
  const item = route?.params?.item; // data passed for update

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    salary: "",
    startDate: new Date(),
    lastIncrementDate: new Date(),
    employmentType: "",
    countryCode: "",
    position: "",
    payType: "",
    terminationDate: new Date(),
    status: "",
    bonusEligible: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState({
    field: "",
    visible: false,
  });

  // Prefill form if editing
  useEffect(() => {
    if (item) {
      setForm({
        first_name: item?.first_name ?? "",
        last_name: item?.last_name ?? "",
        email: item?.email ?? "",
        phone: item?.phone ?? "",
        salary: item?.salary ?? "",
        startDate: item.start_date ? new Date(item.start_date) : new Date(),
        lastIncrementDate: item.last_increment_date ? new Date(item.last_increment_date) : new Date(),
        employmentType: item?.employment_type ?? '',
        countryCode: item?.country_phone_code ?? "",
        position: item?.position_id ?? "",
        payType: item?.pay_type ?? "",
        terminationDate: item.termination_date ? new Date(item.termination_date) : new Date(),
        status: item?.status ?? "",
        bonusEligible: item?.bonus_eligible == true ?"yes":'no' ,
        notes: item?.notes ?? "",
      });
    }
  }, [item]);

  const handleInputChange = (field, value) => {
    // setForm((prev) => ({ ...prev, [key]: value }));
     setForm((prev) => ({
      ...prev,
      [field]: value.label || value,
      // ...(field === "callback" && { employeeId: value.value }), // add priorityId
      // ...(field === "priority" && { priorityId: value.value }), // add priorityId
      // ...(field === "status" && { statusId: value.value })      // add statusId
    }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const isLogin = useSelector((state: any) => state.auth);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(form)
  const param = {
      ...form,
      token: isLogin?.token,
      id: item?.id, // 👈 required for update
      navigation,
    };

      if (item) {
      await UpdateEmployApi(param, setLoading);

        // Update API call
        // await axios.put(`https://your-api.com/employees/${item.id}`, form);
        // Alert.alert("Success ✅", "Employee updated successfully");
      } else {
      await AddEmployApi(param, setLoading);

        // Create API call
        // await axios.post("https://your-api.com/employees", form);
        // Alert.alert("Success ✅", "Employee created successfully");
      }
      // navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error ❌", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <StatusBarComponent />
            <CustomBackHeader
              menuIcon={imageIndex.back}
              label={item ? "Update Employee" : "Add Employee"}
            />

            {/* Text Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              placeholderTextColor={"#ADA4A5"}
              value={form.first_name}
              onChangeText={(val) => handleInputChange("first_name", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              placeholderTextColor={"#ADA4A5"}
              value={form.last_name}
              onChangeText={(val) => handleInputChange("last_name", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor={"#ADA4A5"}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(val) => handleInputChange("email", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor={"#ADA4A5"}
              keyboardType="numeric"
              value={form.phone}
              onChangeText={(val) => handleInputChange("phone", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter salary amount"
              placeholderTextColor={"#ADA4A5"}
              keyboardType="numeric"
              value={form.salary}
              onChangeText={(val) => handleInputChange("salary", val)}
            />

            {/* Date Picker Modal */}
            <DatePickerModal
              visible={showDatePicker.visible}
              mode={showDatePicker?.mode || "date"}
              value={form[showDatePicker.field] || new Date()}
              onClose={() =>
                setShowDatePicker({ visible: false, field: "", mode: "date" })
              }
              onConfirm={(date) => {
                handleInputChange(showDatePicker.field, date);
                setShowDatePicker({ visible: false, field: "", mode: "date" });
              }}
            />

            {/* Date Fields */}
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
                  {form[field] ? form[field]?.toDateString() : `${label} (DD/MM/YYYY)`}
                </Text>
              </TouchableOpacity>
            ))}



            {/* Dropdowns */}
            {options.map(({ key, label, options }) => (
              <CustomDropdown
                key={key}
                label={label}
                options={options}
                value={form[key]}
                onSelect={(val) => handleInputChange(key, val.value)}
              />
            ))}

            {/* Notes */}
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Notes"
              multiline
              value={form.notes}
              onChangeText={(val) => handleInputChange("notes", val)}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, loading && { backgroundColor: "#999" }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {item ? "Update Employee" : "Create Employee"}
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
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
    justifyContent: "center",
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
