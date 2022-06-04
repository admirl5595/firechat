import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function StyledTextInput({ onChangeText, value, placeholder }) {
  return (
    <TextInput
      style={styles.container}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.3)",
    flex: 1,
  },
});
