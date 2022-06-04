import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Friends from "@screens/Main/Friends";
import AddFriend from "@screens/Main/AddFriend";
import FriendRequests from "@screens/Main/FriendRequests";
import mainScreenStyle from "../navigationStyling/mainScreensStyle";
import stackStyle from "../navigationStyling/stackStyling";
import Settings from "@screens/Main/Settings/";

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
        options={stackStyle}
        name="AddFriend"
        component={AddFriend}
      />
      <Stack.Screen
        options={stackStyle}
        name="FriendRequests"
        component={FriendRequests}
      />
      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default FriendsStack;
