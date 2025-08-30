import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";

const allData = [
  { id: "01", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Active" },
  { id: "02", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Deleted" },
 ];

export default function BackburnerScreen() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");

  const filteredData = allData.filter(item => item.status === activeTab);
const nav = useNavigation()
  const renderCard = ({ item }: any) => (
    <TouchableOpacity 
    onPress={()=>nav.navigate(ScreenNameEnum.BackburnerDetail)}
    
    style={styles.card}>
      {/* Row 1: ID & Name */}
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={[styles.label,{
            color:"#000000" ,
            fontWeight:"700" ,
            fontSize:14
          }]}>Task</Text>
          <Text style={[styles.value]}>{item.id}</Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={[styles.label,{
               color:"#000000" ,
               fontWeight:"700",
               fontSize:14
          }]}>Task Name</Text>
          <Text style={styles.value}>Test New Callback </Text>
        </View>
      </View>
  
      
  
      {/* Row 3: Date & Status */}
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={[styles.label,{
               color:"#000000" ,
               fontWeight:"700",
               fontSize:14
          }]}>Status</Text>
          <Text style={styles.value}>Pending</Text>
        </View>
        
        <View style={styles.cardItem}>
          <Text style={[styles.label,{
               color:"#000000" ,
               fontWeight:"700",
               fontSize:14
          }]}>Client</Text>
          <Text style={styles.value}>Ram</Text>
        </View> 
      
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={[styles.label,{
               color:"#000000" ,
               fontWeight:"700",
               fontSize:14
          }]}>Priority</Text>
          <Text style={styles.value}>Pending</Text>
        </View>
        
        <View style={styles.cardItem}>
          <Text style={[styles.label,{
               color:"#000000" ,
               fontWeight:"700",
               fontSize:14
          }]}>Action</Text>
          <View style={{
            flexDirection:"row" ,
            alignItems:"center"
          }}>
            <Image source={imageIndex.eyeBlue} 
            
            style={{
              height:22,
              width:22
            }}
            />
          <Text style={[styles.value,{
            color:"#0D6EFD" ,
            marginLeft:11
          }]}>View</Text>
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

      {/* Tabs */} <Text style={{
        fontSize:15,
        color:"black" ,
        fontWeight:"500"
      }}>
      Backburner Task
      </Text>
      {/* <View style={styles.tabRow}>
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
      </View> */}

      {/* List */}
      <FlatList
        data={filteredData} 
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100,marginTop:12 }}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} 
      onPress={()=> nav.navigate(ScreenNameEnum.AddBackburner)}
      >
        <Image
          source={imageIndex.AddLogo}
          style={{ height: 70, width: 70, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  tabRow: { flexDirection: "row", borderRadius: 20,marginTop:10, marginBottom: 10,backgroundColor: "#eee", },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20, backgroundColor: "#eee", marginHorizontal: 5 },
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
  marginHorizontal:5
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, 
    flex:1
  },
  cardItem: {
    width: "40%", // two items per row
  },
  label: {
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
    fontSize: 14,
  },
  value: {
    color: "#878787",
    fontSize: 12,
    fontWeight:"500"
  },
});
