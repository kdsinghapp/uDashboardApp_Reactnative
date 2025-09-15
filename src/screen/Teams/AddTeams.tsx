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
import { AddNotesApi, AddTeamsApi, GetAllListApi, UpdateNotesApi, UpdateTeamsApi } from "../../Api/apiRequest";
import { useSelector } from "react-redux";
import { s } from "../../utils/Constant";

export default function AddNoteScreen({ route, navigation }) {
  const noteData = route?.params?.item || null;
  const isEdit = !!noteData;
  const isLogin = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    name: "",
    description: "",
    employee: "",
    employeeId: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [tag, setTag] = useState([])
  const [showTagDropdown, setShowTagDropdown] = useState(false);  
  useEffect(() => {

    (async () => {
      const param = {
        token: isLogin?.token
      }
      const dd = await GetAllListApi(param, setLoading)
      console.log(dd?.data?.employees, 'this isv all type data')
      const calb = dd?.data?.employees ? dd?.data?.employees.map(item => ({
        label: item.first_name + ' ' + item.last_name,
        value: item.id,
      })) : []
      const cate = dd?.data?.categories ? dd?.data?.categories.map(item => ({
        label: item.name,
        value: item.id,
      })) : []
      const tag = dd?.data?.tags ? dd?.data?.tags.map(item => ({
        label: item.name,
        value: item.id,
      })) : []
      
      setTag(tag)
      setCallback(calb)
      setCategoryData(cate)
    })()
  }, [])

  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date",
  });

  useEffect(() => {
    if (isEdit && noteData) {
      setForm({
        name: noteData.name || "",
        description: noteData.description || "",
        employee: noteData.employee?.name || "",
          employeeId: noteData?.employee?.id || "",
      });
    }
  }, [noteData]);

  const handleChange = (field: string, value: any) => {
    setForm({
      ...form, [field]: value.label || value,
     ...(field === "employee" && { employeeId: value.value }),
        });
    setErrors({ ...errors, [field]: "" }); // clear error on change
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.employee) {
      newErrors.employee = "Employee is required";
      valid = false;
    }
   

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      ...form,
     token:isLogin?.token,
      navigation,
      id:noteData?.id
    };
     if (isEdit && noteData) {
      UpdateTeamsApi(payload, setLoading)
     }
     else{
    AddTeamsApi(payload, setLoading)

     }

    console.log(payload)
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader
          menuIcon={imageIndex.back}
          label={isEdit ? "Edit Team" : "Add Team"}
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
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={form.name}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("name", text)}
          />
          {errors.name ? <Text style={styles.error}>{errors?.name}</Text> : null}

          {/* Details */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter descriptions"
            multiline
            value={form.description}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("description", text)}
          />

          {/* Category */}
          <Text style={styles.label}>Employee</Text>
          <CustomDropdown
            label="Select employee"
            options={callback}
            value={form.employee}
            onSelect={(val) => handleChange("employee", val)}
          />
          {errors.employee ? (
            <Text style={styles.error}>{errors.employee}</Text>
          ) : null}

      
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
                {isEdit ? "Update Team" : "Create Team"}
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
