import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderSmall from "./HeaderSmall";
import Card from "./Card";
import StyledTextInput from "./StyledTextInput";
import IconButton from "./IconButton";

export default function SearchInput({ title, placeholder, onSubmit }) {
  const [value, setValue] = useState("");

  return (
    <Card>
      <HeaderSmall title={title} />
      <View style={styles.input}>
        <StyledTextInput
          onChangeText={setValue}
          value={value}
          placeholder={placeholder}
          flex={true}
        />
        <IconButton onPress={() => onSubmit(value)} icon="magnifying-glass" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  input: {
    flexDirection: "row",
  },
});
