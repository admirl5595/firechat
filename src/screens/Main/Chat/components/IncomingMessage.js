import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Thumbnail from "@components/Thumbnail";

export default function IncomingMessage({ message, source }) {
  const date = message.date;
  const author = message.author;

  const yyyy = date.getFullYear();
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm =
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

  const dateString = dd + "." + mm + "." + yyyy;

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text>{author}</Text>
        <Text style={styles.text}>{message.body}</Text>
        <Text style={styles.dateText}>{dateString}</Text>
      </View>
      <Thumbnail source={source} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
  },
  text: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  messageContainer: {
    width: "60%",
    marginLeft: "10%",
    marginBottom: "-5%",
  },
  dateText: {
    alignSelf: "flex-end",
    color: "rgba(0,0,0,0.5)",
  },
});
