import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function Card({ children, onPress, flex }) {
  if (!onPress) {
    return (
      <View style={{ ...styles.container, ...(flex && { flex: 1 }) }}>
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...(flex && { flex: 1 }) }}
      onPress={onPress}
    >
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
