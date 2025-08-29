import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#2e7d32",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  pickerContainer: {
    padding: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  okButton: {
    padding: 10,
  },
  okText: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
});
