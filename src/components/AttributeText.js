import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function AttributeText({ attribute, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.attributeText}>{attribute}: </Text>

      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    elevation: 3,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
  },
  attributeText: {
    ...theme.textVariants.body,
    fontWeight: "bold",
  },
  valueText: {
    ...theme.textVariants.body,
  },
});
