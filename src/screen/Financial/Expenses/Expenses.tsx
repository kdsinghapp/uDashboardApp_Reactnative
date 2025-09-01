import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../compoent/SearchBar";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import DeleteModal from "../../../compoent/DeleteModal";

const allData = [
  { id: "01", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Active" },
  { id: "02", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Deleted" },
  { id: "03", name: "Mobile App", amount: "₹80,000.00", details: "Client payment for App project", date: "22 Aug 2025", status: "Active" },
  { id: "03", name: "Mobile App", amount: "₹80,000.00", details: "Client payment for App project", date: "22 Aug 2025", status: "Active" },
];

export default function Note() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const filteredData = allData.filter(item => item.status === activeTab);
  const nav = useNavigation()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  
    const handleDelete = () => {
      // 👇 Your delete API or logic here
      console.log("Item deleted!");
      setDeleteModalVisible(false);
    };
  const renderCard = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => nav.navigate(ScreenNameEnum.ExpensesDetail)}

      style={styles.card}>
      {/* Row 1: ID & Name */}
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={[styles.label]}>ID</Text>
          <Text style={[styles.value]}>{item.id}</Text>
        </View>
        <View style={[styles.cardItem, {alignItems:'flex-end'}]}>
          <Text style={[styles.label]}>Name</Text>
          <Text style={styles.value}>{item.name}</Text>
        </View>
      </View>

      {/* Row 2: Amount & Details */}
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>$50,000</Text>
        </View>
        <View style={[styles.cardItem, {alignItems:'flex-end'}]}>
          <Text style={[styles.label]}>Description</Text>
          <Text style={styles.value}>Budget for UI</Text>
        </View>
      </View>

      {/* Row 3: Date & Status */}
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={[styles.label]}>Created At</Text>
          <Text style={styles.value}>20 Aug 2025</Text>
        </View>
        <View style={[styles.cardItem, {alignItems:'flex-end'}]}>
          <Text style={[styles.label]}>Action</Text>
           <View style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
      }}>
        <TouchableOpacity
      onPress={() => nav.navigate(ScreenNameEnum.ExpensesDetail)}
        >
          <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.eyeBlue} />
        </TouchableOpacity>
        <TouchableOpacity

        >
          <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.editGreen} />

        </TouchableOpacity>
        <TouchableOpacity
onPress={()=>setDeleteModalVisible(true)}
        >
          <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.delite} />
        </TouchableOpacity>
      </View>
        </View>

      </View>

    


    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader />
      <SearchBar />
      {/* <Text style={{
        fontSize: 14,
        color: "black",
        fontWeight: "600"
      }}>Note</Text> */}
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Text style={activeTab === "Active" ? styles.tabTextActive : styles.tabText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Deleted" && styles.activeTab]}
          onPress={() => setActiveTab("Deleted")}
        >
          <Text style={activeTab === "Deleted" ? styles.tabTextActive : styles.tabText}>Deleted</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 12 }}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab}
        onPress={() => nav.navigate(ScreenNameEnum.AddExpenses)}
      >
        <Image
          source={imageIndex.AddLogo}
          style={{ height: 70, width: 70, resizeMode: "contain" }}
        />
      </TouchableOpacity>
       <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
        title="Delete Expenses?"
        message="Are you sure you want to delete this Expenses from your list?"
        cancelText="No"
        confirmText="Yes, Delete"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  tabRow: { flexDirection: "row", borderRadius: 20, marginTop: 10, marginBottom: 10, backgroundColor: "#F5F5F5", },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20, backgroundColor: "#F5F5F5", marginHorizontal: 5 },
  activeTab: { backgroundColor: "#007bff" },
  tabText: { color: "#555" },
  tabTextActive: { color: "#fff", fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  fab: { position: "absolute", bottom: 35, right: 20, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // shadow ka direction
    shadowOpacity: 0.1, // shadow ki transparency
    shadowRadius: 5, // blur
    // Android shadow
    elevation: 5,
    marginHorizontal: 5
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    flex: 1
  },
  cardItem: {
    width: "40%", // two items per row
  },
  label: {
     color: "#000000",
            fontWeight: "700",
            fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: "#878787",
    fontSize: 12,
    fontWeight: "500"
  },
});
