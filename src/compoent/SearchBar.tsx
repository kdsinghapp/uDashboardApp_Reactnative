import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import imageIndex from "../assets/imageIndex";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?:string
 }

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search", onSearchChange ,value, bgColor, icon}) => {
  return (
    <View style={[styles.searchBar,{backgroundColor:"white"}]}>
      <Image source={icon? icon: imageIndex.search} style={styles.icon} resizeMode="cover" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="black"
        onChangeText={onSearchChange}
        value={value}
      />
      <Image source={imageIndex.Filter} style={styles.icon} resizeMode="cover"  />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#F3F4F5",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    marginBottom: 20,
     borderWidth: 1,
    elevation: 1,
    height: 60,
    borderColor: "#E0E0E0", // ✅ proper color code
  
  },
  icon: {
    height: 20,
    width: 20,
    tintColor:"#0D6EFD"
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#AAAAAA",
    marginLeft: 15,
  },
});

export default SearchBar;
