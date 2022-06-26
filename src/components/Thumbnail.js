import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function Thumbnail({ source, size, onPress }) {
  let scale = 1;
  if (size === "large") scale = 2.5;

  const styles = StyleSheet.create({
    container: {
      width: 41 * scale,
      height: 41 * scale,
      borderRadius: 50,
      margin: 5,
    },
  });

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.container}
          source={source ? { uri: source } : require("@res/images/avatar.png")}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Image
        style={styles.container}
        source={source ? { uri: source } : require("@res/images/avatar.png")}
      />
    </View>
  );
}
