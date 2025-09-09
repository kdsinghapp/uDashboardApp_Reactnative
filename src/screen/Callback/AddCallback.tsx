import React, { useEffect, useState } from "react";
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
import DatePickerModal from "../../compoent/DatePickerModal";
import { AddCallbackApi, Get_Priority_Api, Get_Status_Api, GetEmployApi, GetEmployListApi, UpdateCallbackApi } from "../../Api/apiRequest"; // 👈 make sure Update API is added
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";

export default function AddCallback() {
  const navigation = useNavigation();
  const route = useRoute();
  const editItem: any = route.params?.item || null; // 👈 get edit item if passed

  const isLogin = useSelector((state: any) => state.auth);

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
    statusId: "",
    priorityId: "",
    employee: "",
    employeeId: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date" as "date" | "time",
  });

  const [callbackOptions, setCallbackOptions] = useState([])
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const priority = await Get_Priority_Api(setLoading)
      const status = await Get_Status_Api(setLoading)
      const param = {
        token: isLogin?.token
      }
      const employee = await GetEmployListApi(param, setLoading)
      // console.log(employee?.data?.data, 'this is employee')
      setCallbackOptions(employee?.data?.data)
      setPriorityOptions(priority.data)
      setStatusOptions(status.data)
      // console.log(priority.data)
      // console.log(status.data)
    })()
  }, [])
  // 👇 Pre-fill form if edit mode
  useEffect(() => {
    if (editItem) {
      setForm({
        task: editItem.task_name || "",
        details: editItem.details || "",
        callback: editItem.employee?.first_name || "",
        calendarDate: editItem.start_date ? new Date(editItem.start_date) : new Date(),
        tags: "",
        estimateTime: editItem.estimated_time || "",
        startDate: editItem.start_date ? new Date(editItem.start_date) : new Date(),
        startTime: editItem.start_time ? new Date(`1970-01-01T${editItem.start_time}`) : new Date(),
        endDate: editItem.end_date ? new Date(editItem.end_date) : new Date(),
        endTime: editItem.end_time ? new Date(`1970-01-01T${editItem.end_time}`) : new Date(),
        priority: editItem.priority?.name || "",
        status: editItem.status?.name || "",
        priorityId: editItem.priority?.id || "",
        statusId: editItem.status?.id || "",
        employee: editItem.employee?.name || "",
        employeeId: editItem.employee?.id || ""

      });
    }
  }, [editItem]);

  const handleChange = (field: string, value: any) => {
    // setForm({ ...form, [field]: value.label });
    // console.log(field, value)
    setForm((prev) => ({
      ...prev,
      [field]: value.label || value,
      ...(field === "callback" && { employeeId: value.value }), // add priorityId
      ...(field === "priority" && { priorityId: value.value }), // add priorityId
      ...(field === "status" && { statusId: value.value })      // add statusId
    }));
    setErrors({ ...errors, [field]: "" });
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
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    let formattedTime = form.estimateTime;
    if (formattedTime) {
      formattedTime = moment(form.estimateTime, ["HH:mm:ss", "HH:mm"]).format("HH:mm");
    }
    console.log(form)
    const param = {
      ...form,
      estimateTime: formattedTime,
      token: isLogin?.token,
      id: editItem?.id, // 👈 required for update
      navigation,
    };

    if (editItem) {
      // Update
      await UpdateCallbackApi(param, setLoading);
    } else {
      // Add
      await AddCallbackApi(param, setLoading);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader
          menuIcon={imageIndex.back}
          label={editItem ? "Edit Callback" : "Add Callback"}
        />
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
            placeholder="Enter details"
            multiline
            value={form.details}
            onChangeText={(text) => handleChange("details", text)}
          />
          {errors.details && <Text style={styles.error}>{errors.details}</Text>}

          {/* Employee */}
          <Text style={styles.label}>Employee</Text>
          <CustomDropdown
            label="Select Employee"
            options={callbackOptions.map((item) => ({
              label: item?.first_name + ' ' + item?.last_name,   // what will show in dropdown
              value: item?.id      // what you get when selecting
            }))}
            value={form.callback}
            onSelect={(val:any) => handleChange("callback", val)}
          />
          {errors.callback && <Text style={styles.error}>{errors.callback}</Text>}

          {/* Calendar Date */}
          <Text style={styles.label}>Calendar Event Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("calendarDate", "date")}
          >
            <Text>{form?.calendarDate?.toDateString()}</Text>
          </TouchableOpacity>

          {/* Estimate Time */}
          <Text style={styles.label}>Estimate Time</Text>
          {/* <TextInput
            style={styles.input}
            placeholder="Enter estimate time"
            value={form.estimateTime}
            onChangeText={(text) => handleChange("estimateTime", text)}
          /> */}


          <TextInput
            style={styles.input}
            placeholder="Enter estimate time (HH:mm)"
            keyboardType="numeric"
            value={form.estimateTime}
            onChangeText={(text) => {
              // Remove anything except numbers & colon
              let cleaned = text.replace(/[^0-9:]/g, "");

              // Auto format: if user types "230" → "23:0"
              if (cleaned.length === 4 && !cleaned.includes(":")) {
                cleaned = cleaned.slice(0, 2) + ":" + cleaned.slice(2);
              }

              // Keep only HH:mm (max 5 chars)
              if (cleaned.length > 5) {
                cleaned = cleaned.slice(0, 5);
              }

              setForm({ ...form, estimateTime: cleaned });
              setErrors({ ...errors, estimateTime: "" });
            }}
          />
          {errors.estimateTime && (
            <Text style={styles.error}>{errors.estimateTime}</Text>
          )}
          {/* {errors.estimateTime && (
            <Text style={styles.error}>{errors.estimateTime}</Text>
          )} */}

          {/* Start Date & Time */}
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("startDate", "date")}
          >
            <Text>{form.startDate?.toDateString()}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("startTime", "time")}
          >
            <Text>{form.startTime?.toLocaleTimeString()}</Text>
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
            options={priorityOptions.map((item) => ({
              label: item.name,   // what will show in dropdown
              value: item.id      // what you get when selecting
            }))}
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
            options={statusOptions.map((item) => ({
              label: item.name,   // what will show in dropdown
              value: item.id      // what you get when selecting
            }))}
            value={form.status}
            onSelect={(val) => handleChange("status", val)}
          />
          {errors.status && <Text style={styles.error}>{errors.status}</Text>}

          {/* Tags */}
          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Tags"
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
              {loading
                ? editItem
                  ? "Updating..."
                  : "Creating..."
                : editItem
                  ? "Update Callback"
                  : "Create Callback"}
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
