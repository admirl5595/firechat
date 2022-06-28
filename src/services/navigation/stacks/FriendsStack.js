import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Friends from "@screens/Main/Friends";
import FriendRequests from "@screens/FriendRequests";
import AddFriend from "@screens/Main/AddFriend";
import mainScreenStyle from "../navigationStyling/mainScreensStyle";
import stackStyle from "../navigationStyling/stackStyling";
import Settings from "@screens/Main/Settings/";
import Profile from "@screens/Main/Profile";

const Stack = createNativeStackNavigator();

const FriendsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={mainScreenStyle}
        name="Friends"
        component={Friends}
      />
      <Stack.Screen
        options={{
          ...stackStyle,
          title: "Add friend",
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 25,
          },
        }}
        name="AddFriend"
        component={AddFriend}
      />
      <Stack.Screen
        options={{
          ...stackStyle,
          title: "Friend requests",
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 25,
          },
        }}
        name="FriendRequests"
        component={FriendRequests}
      />
      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
      <Stack.Screen options={stackStyle} name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default FriendsStack;
