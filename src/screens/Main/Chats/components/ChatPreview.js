import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Card from "@components/Card";
import Thumbnail from "@components/Thumbnail";
import theme from "@res/theme";
import { auth } from "@firebase-config";

// message: last message in the chat
export default function ChatPreview({ message, chat, onPress }) {
  console.log(message);

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

  if (bodyPreview.length > 10) {
    bodyPreview = bodyPreview.slice(0, 10) + "...";
  }

  const userId = auth.currentUser.uid;

  let seen = true;

  if (userId !== message.authorId && !message.seen) {
    seen = false;
  }

  return (
    // TODO: fix weird shadow when tapping View with elevation
    <Card onPress={onPress}>
      <View style={styles.container}>
        <Thumbnail />
        <Text
          style={{
            ...styles.text,
            fontWeight: seen ? "normal" : "bold",
          }}
        >
          <Text>
            {chat.name}
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
