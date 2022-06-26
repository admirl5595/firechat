import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import Thumbnail from "./Thumbnail";
import theme from "@res/theme";
import IconButton from "./IconButton";

export default function UserPreview({
  fName,
  lName,
  add,
  accept,
  decline,
  text,
  onPress,
  source,
}) {
  return (
    <Card onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.alias}>
          <Thumbnail source={source} />
          <Text style={styles.text}>
            {fName} {lName}
          </Text>
        </View>
        <View style={styles.buttons}>
          {add ? (
            <IconButton
              icon="plus"
              backgroundColor={theme.colors.success}
              onPress={add}
            />
          ) : null}
          {accept ? <IconButton icon="check" onPress={accept} /> : null}
          {decline ? (
            <IconButton
              icon="xmark"
              backgroundColor={theme.colors.failure}
              onPress={decline}
            />
          ) : null}
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{text}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    alignSelf: "center",
    ...theme.textVariants.body,
    marginLeft: 10,
  },
  alias: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
