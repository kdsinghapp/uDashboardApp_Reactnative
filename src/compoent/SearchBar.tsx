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
    <View style={[styles.searchBar, ]}>
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
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    marginBottom: 20,
    height: 54,
    borderColor: "#E0E0E0", // proper color
     // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // shadow direction
    shadowOpacity: 0.1,    // subtle shadow
    shadowRadius: 4,        // blur
    // Android shadow
    elevation: 3,
  justifyContent:"center"
  
  },
  icon: {
    height: 20,
    width: 20,
    tintColor:"#0D6EFD"
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 15,
  },
});

export default SearchBar;
