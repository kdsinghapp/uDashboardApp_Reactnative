import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import imageIndex from "../assets/imageIndex";

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  keyboardType = "default",
  showIcon = false,
  onIconPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, !editable && { color: "#999" }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          editable={editable}
          keyboardType={keyboardType}
        />
        {showIcon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconWrapper}>
            {/* <Icon name="calendar-outline" size={20} color="#555" /> */}
          <Image source={imageIndex.calendar} style={{height:20, width:20}}/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 20,
    backgroundColor: "#F2F2FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    color: "#555",
    borderRadius: 8,
    zIndex: 1,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#FAFCFF",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingVertical: 12,
    fontSize: 15,
    color: "#000",
    height:50
  },
  iconWrapper: {
    paddingLeft: 8,
  },
});
