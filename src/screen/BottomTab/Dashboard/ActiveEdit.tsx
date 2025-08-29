import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
 
const employeesData = [
  { id: "1", name: "Madelyn Calzoni", email: "madelyncalzoni@gmail.com", phone: "789452163" },
  { id: "2", name: "Cristofer Schleifer", email: "cristofer@gmail.com", phone: "789452163" },
  { id: "3", name: "Cheyenne Dokidis", email: "cheyenne@gmail.com", phone: "789452163" },
  { id: "4", name: "Talan Aminoff", email: "talanaminoff@gmail.com", phone: "789452163" },
  { id: "5", name: "Dulco Lubin", email: "dulcolubin@gmail.com", phone: "789452163" },
  { id: "6", name: "Chance Bergson", email: "chancebergson@gmail.com", phone: "789452163" },
];

export default function EmployeeScreen() {
  const [activeTab, setActiveTab] = useState("Active");

  const renderItem = ({ item }:any) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
      <View style={styles.actions}>
        {/* <Ionicons name="eye-outline" size={22} color="#2e86de" />
        <MaterialIcons name="edit" size={22} color="#27ae60" style={{ marginLeft: 15 }} />
        <Entypo name="trash" size={22} color="#e74c3c" style={{ marginLeft: 15 }} /> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        {/* <Ionicons name="search" size={20} color="#aaa" /> */}
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
        />
        {/* <Ionicons name="filter-outline" size={22} color="#333" /> */}
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Text style={[styles.tabText, activeTab === "Active" && styles.activeText]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Deleted" && styles.activeTab]}
          onPress={() => setActiveTab("Deleted")}
        >
          <Text style={[styles.tabText, activeTab === "Deleted" && styles.activeText]}>
            Deleted
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={employeesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        {/* <Ionicons name="add" size={28} color="#fff" /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 5,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: "#2e86de",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  phone: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    marginTop: 5,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#2e86de",
    borderRadius: 30,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
