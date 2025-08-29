import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./style";

type DatePickerModalProps = {
  visible: boolean;
  selectedDate: Date;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}; 

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  selectedDate,
  onClose,
  onConfirm,
}) => {
  const [tempDate, setTempDate] = useState(selectedDate);

  useEffect(() => {
    setTempDate(selectedDate);
  }, [selectedDate, visible]);

  const handleChange = (event: any, date?: Date) => {
    console.log(event, "event")
    console.log(date, "eventdate")

    if (date) {
      setTempDate(date);
    }
    if (Platform.OS === "android") {
      // Auto confirm for Android
      onConfirm(date || tempDate);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
             {Platform.OS === "ios" &&
          <View style={styles.header}>
            <Text style={styles.title}>Select Date</Text>
          </View>
}
          <View style={styles.pickerContainer}>
            {Platform.OS === "ios" ? (
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(event, date) => {
                  if (date) setTempDate(date);
                }}
                style={{ width: "100%" }}
              />
            ) : (
              visible && (
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="calendar"
                  onChange={handleChange}
                />
              )
            )}
          </View>

          {Platform.OS === "ios" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  onConfirm(tempDate);
                  onClose();
                }}
              >
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;