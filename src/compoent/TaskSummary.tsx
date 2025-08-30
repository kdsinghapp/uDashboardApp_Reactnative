// TaskItem.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({ task, onToggleStatus }:any) {
  return (
    <View style={styles.taskBox}>
      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text  allowFontScaling={false} style={styles.label}>TASK</Text>
          <Text  allowFontScaling={false} style={styles.value}>{task.title}</Text>
        </View>
        <View style={styles.col}>
          <Text allowFontScaling={false}  style={styles.label}>TASK MANAGER</Text>
          <Text  allowFontScaling={false}style={styles.value}>{task.manager}</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text  allowFontScaling={false} style={styles.label}>DUE DATE</Text>
          <Text  allowFontScaling={false} style={styles.value}>{task.dueDate}</Text>
        </View>
        <View style={styles.col}>
          <Text allowFontScaling={false}  style={styles.label}>ASSIGNED TO</Text>
          <Text  allowFontScaling={false} style={styles.value}>{task.team}</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text  allowFontScaling={false} style={styles.label}>PROGRESS</Text>
          <View style={styles.progressCircle} />
        </View>
        <View style={styles.col}>
          <Text  allowFontScaling={false} style={styles.label}>STATUS</Text>
          <TouchableOpacity onPress={() => onToggleStatus(task.id)}>
            <Text
            allowFontScaling={false}
              style={[
                styles.status,
                task.status === "Completed" ? styles.completed : styles.pending,
              ]}
            >
              {task.status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  col: { flex: 1 },
  label: { fontSize: 12, color: "#666666" },
  value: { fontSize: 14, fontWeight: "500", lineHeight:22, color: "#484848", marginTop: 5 },
  progressCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#1EB564",
    marginTop: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  completed: { color: "#1EB564" },
  pending: { color: "red" },
});
