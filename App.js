import { Text, View } from "react-native";
import Layout from "./src/components/Layout";
import addIcons from "@res/icons";

export default function App() {
  // adds icons to the library
  addIcons();

  return (
    <Layout>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </Layout>
  );
}
