import React from "react";

import { auth } from "@firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "@screens/Loading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./stacks/AuthStack";
import TabNavigator from "./TabNavigator";

export default function RootNavigator() {
  // listen to user authentication state
  const [user, loading] = useAuthState(auth);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar />
      {user ? (
        <TabNavigator />
      ) : loading ? (
        <Stack.Screen name="Loading" component={Loading} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
