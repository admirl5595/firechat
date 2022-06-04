import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 35,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    ...theme.textVariants.header,
  },
});
