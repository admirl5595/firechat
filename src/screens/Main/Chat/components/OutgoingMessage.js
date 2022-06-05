import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Thumbnail from "@components/Thumbnail";
import theme from "@res/theme";

export default function OutgoingMessage({ message, date }) {
  const yyyy = date.getFullYear();
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm =
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

  const dateString = dd + "." + mm + "." + yyyy;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Text style={styles.dateText}>{dateString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    backgroundColor: theme.colors.primary,
    color: "#fff",
  },
  container: {
    width: "60%",
    marginRight: "10%",
    alignSelf: "flex-end",
  },
  dateText: {
    alignSelf: "flex-end",
    color: "rgba(0,0,0,0.5)",
  },
});