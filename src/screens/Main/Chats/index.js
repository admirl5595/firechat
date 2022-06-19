import { FlatList } from "react-native";
import React, { useContext } from "react";
import ChatsContext from "@services/ChatsContext";
import ChatPreview from "./components/ChatPreview";
import Layout from "@components/Layout";

// get chats
export default function Chats({ navigation }) {
  const chats = useContext(ChatsContext);

  return (
    <Layout>
      {chats.length > 0
        ? chats.map((chat) => (
            <ChatPreview
              onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
              key={chat.msgs.slice(-1)[0].date}
              chat={chat}
              message={chat.msgs.slice(-1)[0]}
            />
          ))
        : null}
    </Layout>
  );
}
