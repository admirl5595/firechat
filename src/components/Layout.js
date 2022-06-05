import { ScrollView, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "../res/theme";
import { StatusBar } from "expo-status-bar";

export default function Layout({ children }) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});
