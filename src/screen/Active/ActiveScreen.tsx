import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
 
const data = [
  {
    id: "01",
    name: "Website Redesign",
    amount: "₹50,000.00",
    details: "Client payment for UI project",
    date: "20 Aug 2025",
  },
  {
    id: "02",
    name: "Website Redesign",
    amount: "₹50,000.00",
    details: "Client payment for UI project",
    date: "20 Aug 2025",
  },
];

export default function ActiveScreen() {
  const renderCard = ({ item }:any) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{item.id}</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{item.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>{item.amount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Details</Text>
        <Text style={styles.value}>{item.details}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Profit & Loss Date</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.actionRow}>
        {/* <Ionicons name="checkmark-circle" size={20} color="green" style={styles.icon} />
        <Ionicons name="pencil" size={20} color="blue" style={styles.icon} />
        <Ionicons name="trash" size={20} color="red" style={styles.icon} /> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent/>
        


      <CustomHeader/>
    
     <SearchBar/>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Deleted</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}>
        <Image source={imageIndex.AddLogo} 
        
        style={{
          height:70,
          width:70 ,
          resizeMode:"contain"
        }}
        />
       </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
  },
  input: { marginLeft: 8, flex: 1 },
  tabRow: { flexDirection: "row", marginBottom: 10 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#eee",
    marginHorizontal: 5,
  },
  activeTab: { backgroundColor: "#007bff" },
  tabText: { color: "#555" },
  tabTextActive: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  label: { fontWeight: "600", color: "#555", width: "40%" },
  value: { color: "#000", width: "55%" },
  actionRow: { flexDirection: "row", marginTop: 10, justifyContent: "flex-end" },
  icon: { marginHorizontal: 8 },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
     
 
    justifyContent: "center",
    alignItems: "center",
 
  },
});
