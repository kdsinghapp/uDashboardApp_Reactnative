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
import CustomDropdown from "../../../compoent/CustomDropdown";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../../compoent/DatePickerModal"; // import modal
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { AddExpensesApi, UpdateExpensesApi } from "../../../Api/apiRequest";

export default function AddExpenses() {
  const navigation = useNavigation()
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    expense_date: new Date(),
    status: "",
  });
  const route = useRoute();
  const editItem: any = route.params?.item || null; // 👈 get edit item if passed
  const isLogin = useSelector((state: any) => state.auth);

  const priorityOptions = [{ label: "paid", value: "paid" }, { label: "unpaid", value: "unpaid" }];



  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState({
    visible: false,
    field: "",
    mode: "date" as "date" | "time",
  });



  // 👇 Pre-fill form if edit mode
  useEffect(() => {
    if (editItem) {
      console.log(editItem)
      setForm({
        name: editItem.name || "",
        description: editItem.description || "",
        status: editItem.employee?.status || "",
        expense_date: editItem.expense_date ? new Date(editItem.expense_date) : new Date(),
        amount: editItem.amount ? String(editItem.amount) : "",
      });
    }
  }, [editItem]);

  const handleChange = (field: string, value: any) => {
    // setForm({ ...form, [field]: value.label });
    // console.log(field, value)
    setForm((prev) => ({
      ...prev,
      [field]: value.value || value,
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

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.description.trim()) {
      newErrors.description = "Description are required";
      valid = false;
    }

    if (!form.amount.trim()) {
      newErrors.amount = "Amount is required";
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
      // estimateTime: formattedTime,
      token: isLogin?.token,
      id: editItem?.id, // 👈 required for update
      navigation,
    };

    if (editItem) {
      // Update
      await UpdateExpensesApi(param, setLoading);
    } else {
      // Add
      await AddExpensesApi(param, setLoading);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Add Expenses Summary"} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={form.name}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("name", text)}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            value={form.amount}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("amount", text)}
            keyboardType="numeric"
          />
          {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

          <Text style={styles.label}>Status</Text>
          <CustomDropdown
            label="Select status"
            options={priorityOptions}
            value={form.status}
            onSelect={(val) => handleChange("status", val)}
          />
          {errors.status && <Text style={styles.error}>{errors.status}</Text>}
          {/* Task */}
          <Text style={styles.label}>Expense Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => openDatePicker("expense_date", "date")}
          >
            <Text>{form.expense_date?.toDateString()}</Text>
          </TouchableOpacity>


          {/* Client */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter description"
            multiline
            value={form.description}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("description", text)}
          />
          {errors.description && <Text style={styles.error}>{errors.description}</Text>}
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
                  ? "Update"
                  : "Create"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <DatePickerModal
          visible={showDatePicker.visible}
          mode={showDatePicker.mode}
          value={form[showDatePicker.field] || new Date()}
          onClose={() =>
            setShowDatePicker({ visible: false, field: "", mode: "date" })
          }
          onConfirm={(date) => handleChange(showDatePicker.field, date)}
        />
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
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
