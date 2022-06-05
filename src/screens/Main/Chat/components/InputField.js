import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import StyledTextInput from "@components/StyledTextInput";
import IconButton from "@components/IconButton";
import theme from "@res/theme";

// use onSubmit to
export default function InputField({ onSubmit }) {
  const [message, setMessage] = useState("asda");

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesomeIcon
          style={styles.icon}
          icon="images"
          color={theme.colors.secondary}
          size={35}
        />
      </TouchableOpacity>
      <StyledTextInput value={message} onChangeText={setMessage} />
      <IconButton onPress={() => onSubmit(message)} icon="paper-plane" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  icon: {
    margin: 10,
  },
});
