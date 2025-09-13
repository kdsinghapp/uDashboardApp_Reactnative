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
import CustomBackHeader from "../../compoent/CustomBackHeader";
import imageIndex from "../../assets/imageIndex";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useSelector } from "react-redux";
import { AddTagApi, UpdateTagApi, } from "../../Api/apiRequest";

export default function TagForm({ route, navigation }) {
  const item = route?.params?.item; // data passed for update

  const [form, setForm] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);


  // Prefill form if editing
  useEffect(() => {
    if (item) {
      setForm({
        name: item?.name ?? "",

      });
    }
  }, [item]);

  const handleInputChange = (field, value) => {
    // setForm((prev) => ({ ...prev, [key]: value }));
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isLogin = useSelector((state: any) => state.auth);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(form)
      const param = {
        ...form,
        token: isLogin?.token,
        id: item?.id,
        navigation,
      };

      if (item) {
        await UpdateTagApi(param, setLoading);
      } else {
        await AddTagApi(param, setLoading);
      }
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
              label={item ? "Update Tag" : "Add Tag"}
            />

            {/* Text Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor={"#ADA4A5"}
              value={form.name}
              onChangeText={(val) => handleInputChange("name", val)}
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
                  {item ? "Update Tag" : "Create Tag"}
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
