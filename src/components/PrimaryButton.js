import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, width: 20 * title.length }} // stupid
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
