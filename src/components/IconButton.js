import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { back } from "react-native/Libraries/Animated/Easing";

export default function IconButton({ icon, onPress, backgroundColor }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: backgroundColor
          ? backgroundColor
          : theme.colors.primary,
      }}
      onPress={onPress}
    >
      <FontAwesomeIcon icon={icon} size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: 50,
    elevation: 5,
  },
});
