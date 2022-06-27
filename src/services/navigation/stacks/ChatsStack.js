import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Chats from "@screens/Main/Chats";
import Chat from "@screens/Main/Chat";
import mainScreenStyle from "../navigationStyling/mainScreensStyle";
import stackStyle from "../navigationStyling/stackStyling";
import Settings from "@screens/Main/Settings/";
import Profile from "@screens/Main/Profile";

const Stack = createNativeStackNavigator();

const ChatsStack = ({ navigation, route }) => {
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["Chat"];

    const routeName = getFocusedRouteNameFromRoute(route);

    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen options={mainScreenStyle} name="Chats" component={Chats} />
      <Stack.Screen
        options={{
          ...stackStyle,
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 25,
          },
        }}
        name="Chat"
        component={Chat}
      />
      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
      <Stack.Screen options={stackStyle} name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ChatsStack;
