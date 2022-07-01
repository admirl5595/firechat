import { View, FlatList, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import InputField from "./components/InputField";
import Layout from "@components/Layout";
import IconButton from "@components/IconButton";
import Loading from "@components/Loading";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import IncomingMessage from "./components/IncomingMessage";
import OutgoingMessage from "./components/OutgoingMessage";
import theme from "@res/theme";

import { addMessage } from "@services/crud-operations/chats";

import ChatsContext from "@services/contexts/ChatsContext";
import UserDataContext from "@services/contexts/UserDataContext";

import { auth } from "@firebase-config";
import { getProfilePicture } from "@services/crud-operations/users";

import uuid from "react-native-uuid";

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@firebase-config";

export default function Chat({ navigation }) {
  const route = useRoute();
  const chatId = route.params.chatId;

  const { chats, setChats } = useContext(ChatsContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const chat = chats.filter((chat) => chat.id === chatId)[0];

  navigation.setOptions({ title: chat.name });

  const messages = chat.msgs;

  const userId = auth.currentUser.uid;

  const [profilePicturesMap, setProfilePicturesMap] = useState(null);

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

    GetProfilePictures();
  }, []);

  const handleSubmit = async ({ body, imageUri }) => {
    if (!body && !imageUri) {
      return;
    }

    // upload image to storage

    let imageId;

    if (imageUri) {
      let path = "chat-data/" + chatId + "/images/";
      imageId = uuid.v4();

      let storageRef = ref(storage, path + imageId);

      const img = await fetch(imageUri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes);
    }

    const newMessage = {
      ...(body && { body: body }),
      date: new Date(),
      authorId: userId,
      author: userData.fName,
      ...(imageId && { imageId: imageId }),
    };

    addMessage(chatId, newMessage);
  };

  if (!profilePicturesMap) {
    return <Loading title="Loading..." />;
  } else {
    // add info button to header
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="circle-info"
          round
          noBackground
          color={theme.colors.primary}
          onPress={() =>
            navigation.navigate("ChatInfo", {
              chat: { ...chat, profilePicturesMap: profilePicturesMap },
            })
          }
        />
      ),
    });

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
                return (
                  <IncomingMessage
                    message={item}
                    chatId={chatId}
                    source={profilePicture}
                  />
                );
              } else {
                return <OutgoingMessage chatId={chatId} message={item} />;
              }
            }}
          />
          <InputField onSubmit={(messageData) => handleSubmit(messageData)} />
        </View>
      </Layout>
    );
  }
}
