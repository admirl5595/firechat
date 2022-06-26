import { View, Text, Switch, StyleSheet } from "react-native";
import React, { useState } from "react";
import theme from "@res/theme";

export default function Toggler({ title, onValueChange }) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isEnabled ? theme.colors.primary : "#fff"}
        value={isEnabled}
        onValueChange={() => {
          setIsEnabled((previousState) => !previousState);
          onValueChange(!isEnabled);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 10,
    alignContent: "space-between",
    backgroundColor: theme.colors.background,
    elevation: 3,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  text: {
    ...theme.textVariants.body,
    fontWeight: "bold",
  },
});
