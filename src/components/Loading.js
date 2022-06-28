import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function Loading({ title, transparent }) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: transparent
          ? "rgba(255,255,255,0.7)"
          : theme.colors.background,
      }}
    >
      <Text style={styles.text}>{title}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...theme.textVariants.headerSmall,
    textAlign: "center",
  },
});
