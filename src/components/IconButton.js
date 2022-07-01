import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import theme from "@res/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function IconButton({
  icon,
  onPress,
  backgroundColor,
  round,
  style,
  size,
  color,
  noBackground,
}) {
  let _backgroundColor = {
    backgroundColor: backgroundColor ? backgroundColor : theme.colors.primary,
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...(!noBackground && _backgroundColor),
        ...(noBackground && { elevation: 0 }),
        borderRadius: round ? 50 : 10,
        ...style,
      }}
      onPress={onPress}
    >
      <FontAwesomeIcon
        icon={icon}
        size={size ? size : 30}
        color={color ? color : "white"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    elevation: 5,
  },
});
