import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import imageIndex from "../assets/imageIndex"; // apne icons yaha rakho
import ScreenNameEnum from "../routes/screenName.enum";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "./StatusBarCompoent";

// -------- Menu Data (sab ek jagah manage karna easy hoga) --------
const menuItems = [
  { id: "1", title: "Dashboard", icon: imageIndex.dasboard, screen: "Dashboard" },
  { id: "2", title: "Profile", icon: imageIndex.dasboard, screen: ScreenNameEnum.EditProfile },
  { id: "3", title: "Backburner Task", icon: imageIndex.dasboard, screen:ScreenNameEnum.DashBoardScreen},
  { id: "4", title: "Assigned Task", icon: imageIndex.dasboard, screen: ScreenNameEnum.ActiveScreen },
   { id: "5", title: "Callbacks", icon: imageIndex.dasboard, screen: ScreenNameEnum.CallbackDetailScreen },
  { id: "6", title: "Employees", icon: imageIndex.dasboard, screen: "Language" },
  { id: "7", title: "Teams", icon: imageIndex.dasboard, screen: "Language" },
  { id: "8", title: "Replies", icon: imageIndex.dasboard, screen: "Language" },
  { id: "9", title: "Notes", icon: imageIndex.dasboard, screen: "Language" },

  { id: "10", title: "Calendar", icon: imageIndex.dasboard, screen: "Language" },
  { id: "11", title: "Financial", icon: imageIndex.dasboard, screen: "Language" },
  { id: "12", title: "Clients", icon: imageIndex.dasboard, screen: "Language" },
  { id: "13", title: "Reference", icon: imageIndex.dasboard, screen: "Language" },
  { id: "15", title: "Logout", icon: imageIndex.dasboard, screen: "Language" },

];

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  // -------- Render Item Function --------
  const renderMenuItem = ({ item }: any) => (
    <View style={{
      flexDirection:"row" ,
      justifyContent:"space-between" , 
      alignItems:"center"
     }}>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.menuText}>{item.title}</Text>
     

    </TouchableOpacity>
    <Image source={imageIndex.next} style={[styles.icon,{
            tintColor:"black" ,
            height:34,
            width:22,

      }]} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBarComponent/>
          <Image
          source={imageIndex.logo} // apna profile image yaha lagao
          style={styles.profileImage}
          resizeMode="contain"
        />

      <FlatList
        data={menuItems} 
        showsVerticalScrollIndicator={false}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
      />

      {/* ---------- Logout Button ---------- */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
     alignItems: "center",
  
  },
  profileImage: {
    height: 45,
    width: 250,
    marginTop:55
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#352C48",
  },
});
