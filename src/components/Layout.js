import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";
import { StatusBar } from "expo-status-bar";

export default function Layout({ children, scroll }) {
  if (scroll) {
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        {children}
      </ScrollView>
    );
  } else
    return (
      <View style={styles.container}>
        <StatusBar />
        {children}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});
