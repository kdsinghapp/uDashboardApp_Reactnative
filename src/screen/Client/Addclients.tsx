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
import { AddCallbackApi, AddClientApi, GetApi } from "../../Api/apiRequest"; // 👈 make sure Update API is added
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { endpointCustomer } from "../../Api/endpoints";

export default function AddCallback() {
  const navigation = useNavigation();
  const route = useRoute();
  const editItem: any = route.params?.item || null;

  const isLogin = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    case: "",
    first_name: "",
    last_name: "",
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
      const priority = await GetApi({ url: endpointCustomer.Get_Priority }, setLoading)
      const status = await GetApi({ url: endpointCustomer.Get_Status }, setLoading)
      const param = {
        token: isLogin?.token,
        url: endpointCustomer.GetTeamsList
      }
      const employee = await GetApi(param, setLoading)
      setCallbackOptions(employee?.data)
      setPriorityOptions(priority.data)
      setStatusOptions(status.data)
      // console.log(priority.data)
      // console.log(status.data)
    })()
  }, [])
  // 👇 Pre-fill form if edit mode
  useEffect(() => {
    if (editItem) {
      console.log(editItem)
      setForm({
        case: editItem.case || "",
        first_name: editItem.first_name || "",
        last_name: editItem.last_name || "",
        details: editItem.details || "",
        callback: editItem.employee_id || "",
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
        employeeId: editItem.employee_id || ""

      });
    }
  }, [editItem]);

  const handleChange = (field: string, value: any) => {
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

    if (!form.case) {
      newErrors.task = "Case name is required";
      valid = false;
    }
    if (!form.first_name) {
      newErrors.first_name = "First name is required";
      valid = false;
    }
    if (!form.last_name) {
      newErrors.last_name = "Last name is required";
      valid = false;
    }
    // if (!form.details) {
    //   newErrors.details = "Details are required";
    //   valid = false;
    // }
    if (!form.callback) {
      newErrors.callback = "Team selection is required";
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

    const param = {
      ...form,
      token: isLogin?.token,
      id: editItem?.id, // 👈 required for update
      navigation,
    };

    await AddClientApi(param, setLoading);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader
          menuIcon={imageIndex.back}
          label={editItem ? "Edit Client" : "Add Client"}
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
          {/* Case */}

          <Text style={styles.label}>Case</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter case name"
            value={form.case}
            onChangeText={(text) => handleChange("case", text)}
          />
          {errors.case && <Text style={styles.error}>{errors.case}</Text>}

          {/* first_name */}
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            value={form.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />
          {errors.first_name && <Text style={styles.error}>{errors.first_name}</Text>}
          {/* last_name */}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={form.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
          {errors.last_name && <Text style={styles.error}>{errors.last_name}</Text>}

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
          <Text style={styles.label}>Assigned Team</Text>
          <CustomDropdown
            label="Select Team"
            options={callbackOptions.map((item) => ({
              label: item?.name ,
              value: item?.id
            }))}
            value={form.callback}
            onSelect={(val: any) => handleChange("callback", val)}
          />
          {errors.callback && <Text style={styles.error}>{errors.callback}</Text>}


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
          {/* <Text style={styles.label}>End Date</Text>
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
          </TouchableOpacity> */}

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
                  ? "Update Client"
                  : "Create Client"}
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
