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
import CustomDropdown from "../../../compoent/CustomDropdown";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerModal from "../../../compoent/DatePickerModal";
import { AddBudgetApi, AddNotesApi, GetAllListApi, GetBudgetCategoryListApi, UpdateBudgetApi, UpdateNotesApi } from "../../../Api/apiRequest";
import { useSelector } from "react-redux";

export default function AddNoteScreen({ route, navigation }:any) {
  const noteData = route?.params?.note || null;
  const isEdit = !!noteData;
  const isLogin = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    categoryId: ""
  });

  interface Errors {
    amount?: string;
    category?: string;
    details?: string;
    [key: string]: string | undefined;
  }
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategory] = useState([])
  useEffect(() => {

    (async () => {
      const param = {
        token: isLogin?.token
      }
      const dd = await GetBudgetCategoryListApi(param, setLoading)
      console.log(dd?.data, 'this isv all type data')
      const calb = dd?.data?.data ? dd?.data?.data.map(item => ({
        label: item.name,
        value: item.id,
      })) : []
      setCategory(calb)
    })()
  }, [])



  useEffect(() => {
    if (isEdit && noteData) {
      setForm({
        amount: noteData.amount || "",
        description: noteData.description || "",
        category: noteData.category?.name || "",
        categoryId: noteData?.category_id
      });
    }
  }, [noteData]);

  const handleChange = (field: string, value: any) => {
    setForm({
      ...form, [field]: value.label || value,
      ...(field === "category" && { categoryId: value.value }),
    });
    setErrors({ ...errors, [field]: "" }); // clear error on change
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    if (!form.amount.trim()) {
      newErrors.amount = "Amount is required";
      valid = false;
    }
    if (!form.category) {
      newErrors.category = "Category is required";
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
      UpdateBudgetApi(payload, setLoading)
     }
     else{
    AddBudgetApi(payload, setLoading)

     }

    console.log(payload)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20 }}>
        <CustomBackHeader
          menuIcon={imageIndex.back}
          label={isEdit ? "Edit Budget" : "Add Budget"}
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
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={form.amount}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("amount", text)}
            keyboardType="numeric"
          />
          {errors.amount ? <Text style={styles.error}>{errors?.amount}</Text> : null}

          {/* Details */}
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter description"
            multiline
            value={form.description}
            placeholderTextColor={"#ADA4A5"}
            onChangeText={(text) => handleChange("description", text)}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <CustomDropdown
            label="Select category"
            options={categoryData}
            value={form.category}
            onSelect={(val) => handleChange("category", val)}
          />
          {errors.category ? (
            <Text style={styles.error}>{errors.category}</Text>
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
                {isEdit ? "Update Budget" : "Create Budget"}
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
