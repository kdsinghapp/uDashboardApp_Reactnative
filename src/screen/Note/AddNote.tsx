import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import CustomDropdown from "../../compoent/CustomDropdown";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../compoent/DatePickerModal";
import { AddNotesApi, GetAllListApi, UpdateNotesApi } from "../../Api/apiRequest";
import { useSelector } from "react-redux";

export default function AddNoteScreen({ route, navigation }) {
  const noteData = route?.params?.note || null;
  const isEdit = !!noteData;
  const isLogin = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    task: "",
    details: "",
    category: "",
    callback: "",
    calendarDate: new Date(),
    tags: "",
    callbackId: "",
    categoryId: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState([])
  useEffect(() => {

    (async () => {
      const param = {
        token: isLogin?.token
      }
      const dd = await GetAllListApi(param, setLoading)
      console.log(dd?.data?.callbacks, 'this isv all type data')
      const calb = dd?.data?.callbacks ? dd?.data?.callbacks.map(item => ({
        label: item.task_name,
        value: item.id,
      })) : []
      setCallback(calb)
    })()
  }, [])

  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date",
  });

  const categoryOptions = [{label:"Work", value:"1"}, {label:"Personal", value:"2"}];
  const callbackOptions = ["Email", "Phone", "Meeting", "None"];

  useEffect(() => {
    if (isEdit && noteData) {
      setForm({
        task: noteData.task || "",
        details: noteData.details || "",
        category: noteData.category?.name || "",
        callback: noteData.callback?.task_name || "",
        calendarDate: noteData.calendar_event_date
          ? new Date(noteData.calendar_event_date)
          : new Date(),
        tags:  "",
        callbackId: noteData?.callback_id,
        categoryId: noteData?.category_id
      });
    }
  }, [noteData]);

  const handleChange = (field: string, value: any) => {
    setForm({
      ...form, [field]: value.label || value,
      ...(field === "callback" && { callbackId: value.value }), // add priorityId
      ...(field === "category" && { categoryId: value.value }),
    });
    setErrors({ ...errors, [field]: "" }); // clear error on change
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    if (!form.task.trim()) {
      newErrors.task = "Task is required";
      valid = false;
    }
    if (!form.category) {
      newErrors.category = "Category is required";
      valid = false;
    }
    if (!form.callback) {
      newErrors.callback = "Callback is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      ...form,
      calendarDate: form.calendarDate,
      token:isLogin?.token,
      navigation,
      id:noteData?.id
    };
     if (isEdit && noteData) {
      UpdateNotesApi(payload, setLoading)
     }
     else{
    AddNotesApi(payload, setLoading)

     }

    console.log(payload)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader
          menuIcon={imageIndex.back}
          label={isEdit ? "Edit Note" : "Add Note"}
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
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("task", text)}
          />
          {errors.task ? <Text style={styles.error}>{errors?.task}</Text> : null}

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
          {errors.category ? (
            <Text style={styles.error}>{errors.category}</Text>
          ) : null}

          {/* Callback */}
          <Text style={styles.label}>Callback</Text>
          <CustomDropdown
            label="Select callback"
            options={callback}
            value={form.callback}
            onSelect={(val) => handleChange("callback", val)}
          />
          {errors?.callback ? (
            <Text style={styles.error}>{errors.callback}</Text>
          ) : null}
          {/* Calendar Event Date */}
          <Text style={styles.label}>Calendar Event Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              setShowDatePicker({
                visible: true,
                field: "calendarDate",
                mode: "date",
              })
            }
          >
            <Text>{form.calendarDate.toDateString()}</Text>
          </TouchableOpacity>

          <DatePickerModal
            visible={showDatePicker.visible}
            mode={showDatePicker.mode as "date" | "time"}
            value={form[showDatePicker.field] || new Date()}
            onClose={() =>
              setShowDatePicker({ visible: false, field: "", mode: "date" })
            }
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

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isEdit ? "Update Note" : "Create Note"}
              </Text>
            )}
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
    marginBottom: 8,
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
