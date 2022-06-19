import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "@firebase-config";

import uuid from "react-native-uuid";

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
    name: user1.fName + " and " + user2.fName + "'s chat", // TODO: use other members name as name for given user
  };

  let res = await setDoc(doc(db, "chats", id), chatDocument);

  return id;
}
