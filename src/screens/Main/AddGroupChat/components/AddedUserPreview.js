import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Thumbnail from "@components/Thumbnail";
import IconButton from "@components/IconButton";
import theme from "@res/theme";

export default function AddedUserPreview({ userData, remove }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.removeBtn}>
          <IconButton
            icon="xmark"
            backgroundColor={theme.colors.trinary}
            round
            size={15}
            color="white"
            style={{ padding: 5 }}
            onPress={() => remove(userData)}
          />
        </View>
        <Thumbnail size="medium" source={userData.profilePicture} />
      </View>

      <Text style={styles.text}>
        {userData.fName} {userData.lName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    width: 75,
  },
  text: {
    color: "black",
    textAlign: "center",
  },
  removeBtn: {
    position: "absolute",
    zIndex: 1,
    right: -5,
    top: -5,
  },
  imageContainer: {},
});
