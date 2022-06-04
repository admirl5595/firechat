import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chats from "@screens/Main/Chats";
import Chat from "@screens/Main/Chat";
import mainScreenStyle from "../navigationStyling/mainScreensStyle";
import stackStyle from "../navigationStyling/stackStyling";
import Settings from "@screens/Main/Settings/";

const Stack = createNativeStackNavigator();

const ChatsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={mainScreenStyle} name="Chats" component={Chats} />
      <Stack.Screen options={stackStyle} name="Chat" component={Chat} />
      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default ChatsStack;
