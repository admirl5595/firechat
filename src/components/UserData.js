import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Thumbnail from "@components/Thumbnail";
import Card from "@components/Card";
import AttributeText from "@components/AttributeText";
import Header from "@components/Header";

export default function UserData({ userData, image, pickImage, friends }) {
  return (
    <>
      <View style={styles.header}>
        <Header title={userData.fName + " " + userData.lName} />
        <Thumbnail source={image} size="large" onPress={pickImage} />
      </View>
      <Card>
        <AttributeText
          attribute="name"
          value={userData.fName + " " + userData.lName}
        />
        <AttributeText attribute="email" value={userData.email} />
        <AttributeText attribute="friends" value={friends.length} />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
});
