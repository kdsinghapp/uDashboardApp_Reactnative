import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const data = [
  {
    id: "1",
    name: "Gina Vaneloven",
    progress: 0.8,
    color: "#2979FF",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Albert Flores",
    progress: 0.7,
    color: "#00BCD4",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "3",
    name: "Matte Hannnery",
    progress: 0.55,
    color: "#FFC107",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
  },
];

const TaskCompleteProgressBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Task Completion By User</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.percent}>{Math.round(item.progress * 100)}%</Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.progress * 100}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  header: { color: "#000", fontSize: 16, fontWeight: "bold" },
  viewAll: { color: "#2979FF", fontSize: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: { color: "#000", fontSize: 14, fontWeight: "600" },
  percent: { color: "#000", fontSize: 14 },
  progressBackground: {
    height: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginTop: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
});

export default TaskCompleteProgressBar;
