import { View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import InputField from "./components/InputField";
import Layout from "@components/Layout";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import IncomingMessage from "./components/IncomingMessage";
import OutgoingMessage from "./components/OutgoingMessage";

import { addMessage } from "@services/crud-operations/chats";

import ChatsContext from "@services/contexts/ChatsContext";
import UserDataContext from "@services/contexts/UserDataContext";

import { auth } from "@firebase-config";
import { getProfilePicture } from "@services/crud-operations/users";

export default function Chat({ navigation }) {
  const route = useRoute();
  const chatId = route.params.chatId;

  const { chats, setChats } = useContext(ChatsContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const chat = chats.filter((chat) => chat.id === chatId)[0];

  const messages = chat.msgs;

  const userId = auth.currentUser.uid;

  const [profilePicturesMap, setProfilePicturesMap] = useState({});

  useEffect(() => {
    async function GetProfilePictures() {
      let otherMemberIds = chat.members.filter(
        (id) => id !== auth.currentUser.uid
      );

      let map = {};

      for (const memberId of otherMemberIds) {
        const profilePicture = await getProfilePicture(memberId);

        map[memberId] = profilePicture;
      }

      setProfilePicturesMap(map);
    }

    console.log("effect...");

    GetProfilePictures();
  }, []);

  const handleSubmit = (messageData) => {
    const newMessage = {
      body: messageData.body,
      image: messageData.photoUrl,
      date: new Date(),
      seen: false,
      authorId: userId,
      author: userData.fName,
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
            let authorId = item.authorId;

            let profilePicture = profilePicturesMap[authorId];

            if (item.authorId !== userId) {
              return <IncomingMessage message={item} source={profilePicture} />;
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
