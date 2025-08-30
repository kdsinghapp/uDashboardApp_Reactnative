import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";

const allData = [
  {
    id: "01",
    name: "Website Redesign",
    amount: "₹50,000.00",
    details: "Client payment for UI project",
    date: "20 Aug 2025",
    status: "Active",
  },
  {
    id: "02",
    name: "Website Redesign",
    amount: "₹50,000.00",
    details: "Client payment for UI project",
    date: "20 Aug 2025",
    status: "Deleted",
  },
  {
    id: "03",
    name: "Mobile App",
    amount: "₹80,000.00",
    details: "Client payment for App project",
    date: "22 Aug 2025",
    status: "Active",
  },
  {
    id: "04",
    name: "Mobile App",
    amount: "₹80,000.00",
    details: "Client payment for App project",
    date: "22 Aug 2025",
    status: "Active",
  },
];

export default function AddclientsScreen() {
  const nav = useNavigation();

  const renderCard = ({ item }: any) => (
    <View
    
      style={styles.card}
    >
      {/* Top Row: Name & Status */}
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.name}>Team </Text>
          <Text style={styles.details}>	Case</Text>
        </View>
        <View>
          <Text style={styles.name}>Team 1</Text>
          <Text style={styles.details}>	Legal Settlements 2</Text>
        </View>
        <View style={styles.cardBottomRow}>
        <TouchableOpacity  
        
        onPress={() => nav.navigate(ScreenNameEnum.AddclientsDetail)}
        style={styles.iconBtn}>
          <Image style={styles.icon} source={imageIndex.eyeBlue} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Image style={styles.icon} source={imageIndex.editGreen} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Image style={styles.icon} source={imageIndex.delite} />
        </TouchableOpacity>
      </View>
      </View>

      
     
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader />
      <SearchBar />
      <Text style={styles.name}>Add clients</Text>

      <FlatList
        data={allData}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 12 }}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} 
      
      onPress={()=>{
        nav.navigate(ScreenNameEnum.Addclients)
      }}
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
  fab: {
    position: "absolute",
    bottom: 35,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Android shadow
    elevation: 5,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardMiddleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems:"center"

  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  details: {
    fontSize: 14,
    color: "#878787",
    marginTop: 2,
    lineHeight:22
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#878787",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  iconBtn: {
    marginLeft: 12,
  },
  icon: {
    height: 22,
    width: 22,
  },
});
