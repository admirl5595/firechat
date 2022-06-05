import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function HeaderAndIcon({ title, icon, iconColor }) {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        style={styles.icon}
        icon={icon}
        size={80}
        color={iconColor ? iconColor : "#fff"}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 35,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
  },
  text: {
    textAlign: "center",
    ...theme.textVariants.header,
  },
  icon: {
    margin: 10,
  },
});
