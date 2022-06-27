import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function Card({ children, onPress }) {
  if (!onPress) {
    return <View style={styles.container}>{children}</View>;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: theme.colors.background,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
