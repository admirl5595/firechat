import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ChatsStack from "./stacks/ChatsStack";
import FriendsStack from "./stacks/FriendsStack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import theme from "@res/theme";

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
          return <Icon icon={iconName} color={theme.colors.primary} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
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
  return <FontAwesomeIcon size={25} icon={icon} color={color} />;
}

export default TabNavigator;
