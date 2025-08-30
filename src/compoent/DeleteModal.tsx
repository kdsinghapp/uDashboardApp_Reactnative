// DeleteModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import imageIndex from "../assets/imageIndex";

const { width } = Dimensions.get("window");

type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title = "Delete Item?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  cancelText = "Cancel",
  confirmText = "Delete",
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon inside circle */}
          <View style={styles.iconWrapper}>
            <Image source={imageIndex.delite} style={styles.icon} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, styles.cancelText]}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, styles.confirmText]}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 59, 48, 0.1)", // soft red bg
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  icon: {
    width: 36,
    height: 36,
    tintColor: "#FF3B30", // iOS delete red
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  confirmButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    color: "#333",
  },
  confirmText: {
    color: "#fff",
  },
});

export default DeleteModal;
