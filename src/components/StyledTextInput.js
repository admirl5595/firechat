import { View, Text, TextInput, StyleSheet, Image } from "react-native";
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
    <View style={{ ...styles.container, flex: flex ? 1 : 0 }}>
      <TextInput
        style={{
          ...styles.textInput,
          borderColor: error ? theme.colors.failure : "rgba(0,0,0,.3)",
          flex: flex ? 1 : 0,
        }}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  container: {},
  image: {
    height: 70,
    width: 70,
    margin: 12,
    borderRadius: 10,
  },
});
