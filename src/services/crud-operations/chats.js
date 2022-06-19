import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "@firebase-config";

export async function addMessage(chatId, message) {
  const chatDocRef = doc(db, "chats", chatId);
  const res = await updateDoc(chatDocRef, { msgs: arrayUnion(message) });

  console.log(res);
}
