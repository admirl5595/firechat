import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function Card({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
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
