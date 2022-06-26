import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function StyledTextInput({
  error,
  onChangeText,
  value,
  placeholder,
  flex,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={{
        ...styles.container,
        borderColor: error ? theme.colors.failure : "rgba(0,0,0,.3)",
        flex: flex ? 1 : 0,
      }}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder ? placeholder : ""}
      secureTextEntry={secureTextEntry}
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
  },
});
