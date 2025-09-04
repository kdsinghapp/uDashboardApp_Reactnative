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
  Alert,
} from "react-native";
import CustomDropdown from "../../compoent/CustomDropdown";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../compoent/DatePickerModal";
import { AddCallbackApi } from "../../Api/apiRequest";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function AddCallback() {
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
  const isLogin = useSelector((state: any) => state.auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date" as "date" | "time",
  });

  const callbackOptions = ["Ram", "Kamlesh"];
  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions = ["Pending", "In Progress", "Completed"];

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" }); // clear error when user types
  };

  const openDatePicker = (field: string, mode: "date" | "time" = "date") => {
    setShowDatePicker({ visible: true, field, mode });
  };

  // ✅ Validate fields
  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!form.task) {
      newErrors.task = "Task name is required";
      valid = false;
    }
    if (!form.details) {
      newErrors.details = "Client details are required";
      valid = false;
    }
    if (!form.callback) {
      newErrors.callback = "Employee selection is required";
      valid = false;
    }
    if (!form.estimateTime) {
      newErrors.estimateTime = "Estimate time is required";
      valid = false;
    }
    if (!form.priority) {
      newErrors.priority = "Priority is required";
      valid = false;
    }
    if (!form.status) {
      newErrors.status = "Status is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ API Call
  const navigation = useNavigation()
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const param ={
...form,
token:isLogin?.token,
navigation
    }
AddCallbackApi(param, setLoading)

  
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Add Callbacks"} />
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
            onChangeText={(text) => handleChange("task", text)}
          />
          {errors.task && <Text style={styles.error}>{errors.task}</Text>}

          {/* Client */}
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Search etails"
            multiline
            value={form.details}
            onChangeText={(text) => handleChange("details", text)}
          />
          {errors.details && <Text style={styles.error}>{errors.details}</Text>}

          {/* Employee */}
          <Text style={styles.label}>Employee</Text>
          <CustomDropdown
            label="Select Employee"
            options={callbackOptions}
            value={form.callback}
            onSelect={(val) => handleChange("callback", val)}
          />
          {errors.callback && <Text style={styles.error}>{errors.callback}</Text>}

          {/* Calendar Event */}
          <Text style={styles.label}>Calendar Event Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("calendarDate", "date")}
          >
            <Text>{form.calendarDate.toDateString()}</Text>
          </TouchableOpacity>

          {/* Estimate Time */}
          <Text style={styles.label}>Estimate Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter estimate time"
            value={form.estimateTime}
            onChangeText={(text) => handleChange("estimateTime", text)}
          />
          {errors.estimateTime && (
            <Text style={styles.error}>{errors.estimateTime}</Text>
          )}

          
          {/* Start Date & Time */}
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("startDate", "date")}
          >
            <Text>{form.startDate.toDateString()}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("startTime", "time")}
          >
            <Text>{form.startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          {/* End Date & Time */}
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("endDate", "date")}
          >
            <Text>{form.endDate.toDateString()}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("endTime", "time")}
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
          {errors.priority && (
            <Text style={styles.error}>{errors.priority}</Text>
          )}

          {/* Status */}
          <Text style={styles.label}>Status</Text>
          <CustomDropdown
            label="Select Status"
            options={statusOptions}
            value={form.status}
            onSelect={(val) => handleChange("status", val)}
          />
          {errors.status && <Text style={styles.error}>{errors.status}</Text>}

          {/* Details */}
          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Details"
            value={form.tags}
            onChangeText={(text) => handleChange("tags", text)}
          />

          {/* Submit */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating..." : "Create Callback"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <DatePickerModal
        visible={showDatePicker.visible}
        mode={showDatePicker.mode}
        value={form[showDatePicker.field] || new Date()}
        onClose={() =>
          setShowDatePicker({ visible: false, field: "", mode: "date" })
        }
        onConfirm={(date) => handleChange(showDatePicker.field, date)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  label: { marginBottom: 5, fontWeight: "500", fontSize: 14 },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 5,
    height: 55,
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0D6EFD",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
