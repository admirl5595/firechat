import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Thumbnail({ source }) {
  return (
    <View>
      <Image
        style={styles.container}
        source={require("@res/images/avatar.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 41,
    height: 41,
    borderRadius: 50,
    margin: 5,
  },
});
