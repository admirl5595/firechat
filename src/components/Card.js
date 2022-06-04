import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function Card({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: theme.colors.background,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
