import { View, Text } from "react-native";
import React from "react";
import PrimaryButton from "@components/PrimaryButton";
import { signOut } from "firebase/auth";
import { auth } from "@firebase-config";

export default function Settings() {
  const logout = () => {
    signOut(auth);
  };

  return (
    <View>
      <Text>Settings</Text>
      <PrimaryButton onPress={logout} title="Log out" />
    </View>
  );
}
