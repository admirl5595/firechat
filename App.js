import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Layout from "./src/components/Layout";
import theme from "@res/theme";

export default function App() {
  return (
    <Layout>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </Layout>
  );
}
