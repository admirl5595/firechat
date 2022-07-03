import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "@firebase-config";

import uuid from "react-native-uuid";

export async function addGroupChat(chatName, memberIds) {
  const chatId = uuid.v4();

  const groupChatDocument = {
    id: chatId,
    members: memberIds,
    msgs: [],
    name: chatName,
    groupChat: true,
  };

  let res = setDoc(doc(db, "chats", chatId), groupChatDocument);

  // add chatId to each members user document
  for (const userId of memberIds) {
    const userDocRef = doc(db, "users", userId);

    let res = await updateDoc(userDocRef, { chats: arrayUnion(chatId) });
  }

  return id;
}

export async function addMessage(chatId, message) {
  const chatDocRef = doc(db, "chats", chatId);
  const res = await updateDoc(chatDocRef, { msgs: arrayUnion(message) });
}

export async function addChat(user1, user2) {
  const id = uuid.v4();

  const chatDocument = {
    id: id,
    members: [user1.id, user2.id],
    msgs: [],
    name: user1.fName + " and " + user2.fName + "'s chat",
    groupChat: false,
  };

  let res = await setDoc(doc(db, "chats", id), chatDocument);

  return id;
}
