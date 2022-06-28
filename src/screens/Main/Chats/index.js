import { FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ChatsContext from "@services/contexts/ChatsContext";
import ChatPreview from "./components/ChatPreview";
import Layout from "@components/Layout";
import HeaderAndIcon from "@components/HeaderAndIcon";
import Loading from "@components/Loading";

// get chats
export default function Chats({ navigation }) {
  const { chats, setChats, loadingChats } = useContext(ChatsContext);

  // if chat has more than 2 members, use default chat.name and image
  // if not, set chat.name to other user's first name and image to other user's profile picture

  if (loadingChats) {
    return <Loading title="Loading chats..." />;
  }

  return (
    <Layout>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatPreview
            onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
            key={chat.msgs.length > 0 ? chat.msgs.slice(-1)[0].date : null}
            chat={chat}
            message={chat.msgs.length > 0 ? chat.msgs.slice(-1)[0] : null}
          />
        ))
      ) : (
        <HeaderAndIcon
          title="You have no chats!"
          icon="face-grin-tears"
          iconColor="#ab34df"
        />
      )}
    </Layout>
  );
}
