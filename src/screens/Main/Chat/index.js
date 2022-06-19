import { View, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import InputField from "./components/InputField";
import Layout from "@components/Layout";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import IncomingMessage from "./components/IncomingMessage";
import OutgoingMessage from "./components/OutgoingMessage";

import { addMessage } from "@services/crud-operations/chats";
import ChatsContext from "@services/contexts/ChatsContext";
import { auth } from "@firebase-config";

// TODO: add authorId to new messages

export default function Chat({ navigation }) {
  const route = useRoute();
  const chatId = route.params.chatId;

  const chats = useContext(ChatsContext);

  const chat = chats.filter((chat) => chat.id === chatId)[0];

  const messages = chat.msgs;

  const userId = auth.currentUser.uid;

  const [message, setMessage] = useState({
    body: "",
    image: "",
    date: null, // use new Date() when posting
    seen: false,
    authorId: userId,
    author: "", // TODO: implement userContext and use fName + lName here
  });

  const handleSubmit = (messageData) => {
    const newMessage = {
      body: messageData.body,
      image: messageData.photoUrl,
      date: new Date(), // use new Date() when posting
      seen: false,
      authorId: userId,
      author: "Admir1<default>", // TODO: implement userContext and use fName + lName here
    };

    addMessage(chatId, newMessage);
  };

  return (
    <Layout scroll={false}>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          contentContainerStyle={{ flexDirection: "column-reverse" }}
          data={messages}
          renderItem={({ item }) => {
            if (item.authorId !== userId) {
              return <IncomingMessage message={item} />;
            } else {
              return <OutgoingMessage message={item} />;
            }
          }}
        />
        <InputField onSubmit={(messageData) => handleSubmit(messageData)} />
      </View>
    </Layout>
  );
}
