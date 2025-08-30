import React, { useState } from "react";
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
import LogoutModal from "./LogoutModal";

// -------- Menu Data (sab ek jagah manage karna easy hoga) --------
const menuItems = [
  { id: "1", title: "Dashboard", icon: imageIndex.dasboard, screen:"Dashboard" },
  { id: "2", title: "Profile", icon: imageIndex.ProfielPng, screen: ScreenNameEnum.EditProfile },
  { id: "3", title: "Backburner Task", icon: imageIndex.Bacxkbuer, screen:ScreenNameEnum.Backburner},
  { id: "4", title: "Callbacks", icon: imageIndex.MyAddress, screen: ScreenNameEnum.CallBack },
  { id: "5", title: "Employees", icon: imageIndex.dasboard, screen:  ScreenNameEnum.EmployeeScreen },
  
  { id: "7", title: "Notes", icon: imageIndex.Note, screen: ScreenNameEnum.Note},

  { id: "8", title: "Teams", icon: imageIndex.dasboard, screen: ScreenNameEnum.TeamScreen },
  { id: "9", title: "Assigned Task", icon: imageIndex.Calendar, screen: ScreenNameEnum.AssingnedScreen },

  { id: "10", title: "Replies", icon: imageIndex.Replies, screen: "Language" },

  { id: "11", title: "Calendar", icon: imageIndex.Calendar, screen: ScreenNameEnum.CalendarScreen },
  { id: "12", title: "Financial", icon: imageIndex.dasboard, screen: "Language" },
  { id: "13", title: "Clients", icon: imageIndex.Calendar, screen: ScreenNameEnum.AddclientsScreen },
  { id: "14", title: "Reference", icon: imageIndex.Reference, screen: "Language" },
  { id: "15", title: "Logout", icon: imageIndex.Logout, screen: "Language" },

];

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
const [LogoutModal1,setLogoutModal]= useState(false)
  // -------- Render Item Function --------
  const renderMenuItem = ({ item }: any) => (
    <View style={{
      flexDirection:"row" ,
      justifyContent:"space-between" , 
      alignItems:"center"
     }}>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (item.title == "Logout") {
          setLogoutModal(true);
        } else {
          navigation.navigate(item.screen);
        }
      }}
      
    >
      <Image source={item.icon} style={styles.icon} />
      <Text  allowFontScaling={false} style={styles.menuText}>{item.title}</Text>
     

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
      <LogoutModal visible={LogoutModal1} 
      onClose={()=>{
        setLogoutModal(false)
      }}
      onConfirm={()=>{
        setLogoutModal(false)
      }}
      />
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
