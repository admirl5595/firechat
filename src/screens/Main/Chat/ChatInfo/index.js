import { View, Text } from "react-native";
import React from "react";
import Layout from "@components/Layout";
import { useRoute } from "@react-navigation/native";

export default function ChatInfo({ navigation }) {
  const route = useRoute();

  const chat = route.params.chat;

  navigation.setOptions({ title: chat.name });

  return (
    <Layout>
      <Text>ChatInfo</Text>
      <Text>{chat.name}</Text>
    </Layout>
  );
}
