import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ChatsStack from "./stacks/ChatsStack";
import FriendsStack from "./stacks/FriendsStack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import theme from "@res/theme";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;

          switch (route.name) {
            case "chats":
              iconName = "comments";
              break;
            case "friends":
              iconName = "user-group";
              break;
          }

          // You can return any component that you like here!
          return <Icon icon={iconName} color={"black"} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        headerShown: false,
      })}
    >
      {/* <Tab.Screen name="Admin Home" component={AdminHomeStack} /> */}
      <Tab.Screen name="chats" component={ChatsStack} />
      <Tab.Screen name="friends" component={FriendsStack} />
    </Tab.Navigator>
  );
};

function Icon({ icon, color }) {
  return (
    <View style={{ marginTop: "5%" }}>
      <FontAwesomeIcon size={35} icon={icon} color={color} />
    </View>
  );
}

export default TabNavigator;
