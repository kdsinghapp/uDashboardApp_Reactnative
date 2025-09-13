import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
 import imageIndex from "../assets/imageIndex";
 
const CustomDropdown = ({ label, options, value, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setOpen(!open)}
      >
        <Text style={{ color: value ? "#000" : "#888" }}>
          {value ? value : label}
        </Text>
        {/* <AntDesign
          name={open ? "up" : "down"}
          size={16}
          color="#333"
        /> */}
        <Image source={imageIndex.downRed} 
        style={{
          height:22,
          width:22,
          tintColor:"#333"
        }}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownHeader: {
    borderWidth: 1,
    borderColor: "#EAEAEA",

    borderRadius: 8,
    padding: 14,
     flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: "#fff",
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default CustomDropdown;
