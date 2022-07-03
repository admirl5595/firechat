import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Chats from "@screens/Main/Chats";
import Chat from "@screens/Main/Chat";
import ChatInfo from "@screens/Main/Chat/ChatInfo";
import AddGroupChat from "@screens/Main/AddGroupChat";
import mainScreenStyle from "../navigationStyling/mainScreensStyle";
import stackStyle from "../navigationStyling/stackStyling";
import Settings from "@screens/Main/Settings/";
import Profile from "@screens/Main/Profile";
import IconButton from "@components/IconButton";
import { View } from "react-native";
import theme from "@res/theme";

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
      <Stack.Screen
        options={({ navigation }) => ({
          ...mainScreenStyle(navigation),

          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <IconButton
                noBackground
                icon={"circle-plus"}
                color={theme.colors.primary}
                onPress={() => navigation.navigate("AddGroupChat")}
              />

              <IconButton
                onPress={() => navigation.navigate("Settings")}
                noBackground
                icon="gear"
                color="rgba(0,0,0,0.5)"
                size={20}
              />
            </View>
          ),
        })}
        name="Chats"
        component={Chats}
      />
      <Stack.Screen
        options={{
          ...stackStyle,
        }}
        name="Chat"
        component={Chat}
      />
      <Stack.Screen
        options={{
          ...stackStyle,
          headerTitle: "New Group",
        }}
        name="AddGroupChat"
        component={AddGroupChat}
      />

      <Stack.Screen options={stackStyle} name="ChatInfo" component={ChatInfo} />
      <Stack.Screen options={stackStyle} name="Settings" component={Settings} />
      <Stack.Screen options={stackStyle} name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ChatsStack;
