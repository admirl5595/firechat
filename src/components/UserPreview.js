import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import Thumbnail from "./Thumbnail";
import theme from "@res/theme";

export default function UserPreview({ fName, lName }) {
  return (
    <Card>
      <View style={styles.container}>
        <Thumbnail />
        <Text style={styles.text}>
          {fName} {lName}
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
});
