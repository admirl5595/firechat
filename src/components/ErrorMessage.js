import { StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function ErrorMessage({ error }) {
  return <Text style={styles.text}>{error}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.failure,
  },
});
