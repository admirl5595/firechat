import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";

export default function HeaderSmall({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    ...theme.textVariants.headerSmall,
  },
});
