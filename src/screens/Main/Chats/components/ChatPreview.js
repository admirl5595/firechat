import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "@components/Card";
import Thumbnail from "@components/Thumbnail";
import theme from "@res/theme";

// message: last message in the chat
export default function ChatPreview({ message }) {
  const hour =
    message.date.getHours() < 10
      ? "0" + message.date.getHours()
      : message.date.getHours();

  const minute =
    message.date.getMinutes() < 10
      ? "0" + message.date.getMinutes()
      : message.date.getMinutes();

  const timeString = hour + ":" + minute;

  let bodyPreview = message.body;

  if (bodyPreview.length > 20) {
    bodyPreview = bodyPreview.slice(0, 20) + "...";
  }

  return (
    <Card>
      <View style={styles.container}>
        <Thumbnail />
        <Text
          style={{
            ...styles.text,
            fontWeight: message.seen ? "normal" : "bold",
          }}
        >
          <Text>
            {message.author}
            {"\n"}
          </Text>
          <Text style={styles.smallText}>
            {message.author}: {bodyPreview} • {timeString}
          </Text>
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    alignSelf: "center",
    ...theme.textVariants.body,
    marginLeft: 10,
  },
  smallText: {
    fontSize: 14,
  },
});
