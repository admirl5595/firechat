import {
  query,
  collection,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@firebase-config";

// TODO: trigger notifications when a chat is modified (ie. new message has been detected)

// listens for changes in a users chat documents (filtered by chatIds parameter)
// changes trigger context updates
export function setupChatListener(chatIds, setChats, unsub) {
  if (!chatIds) return;

  // query chats which the user is a member of
  const q = query(collection(db, "chats"), where("id", "in", chatIds));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log("chats update detected");
      console.log(change.type);

      // get document that changed
      let chat = change.doc.data();
      // get document id
      const id = change.doc.id;

      // convert timestamp to date

      // store id in object
      chat = {
        id: id,
        ...chat,
        msgs: chat.msgs.map((oldMessage) => ({
          ...oldMessage,
          date: oldMessage.date.toDate(),
        })),
      };

      // add chat to context
      if (change.type === "added") {
        setChats((prevChats) => [
          ...prevChats.filter((chat) => chat.id !== id), // prevent duplicate chats
          chat,
        ]);
      }

      // replace old chat
      if (change.type === "modified") {
        setChats((prevChats) => {
          // remove old version of chat
          let newChats = prevChats.filter((oldChat) => oldChat.id !== id);

          // push new chat object
          newChats.push(chat);

          return newChats;
        });
      }

      // remove old chat
      if (change.type === "removed") {
        setChats((prevChats) => {
          // remove old version of chat
          let newChats = prevChats.filter((oldChat) => oldChat.id !== id);

          return newChats;
        });
      }
    });
  });

  if (unsub) {
    console.log("unsubbing...");
    setChats([]);
    unsubscribe();
  }
}

// listen for changes in user document (friend requests and chats)
export async function setupUserDataListener(userId, setChats, setFriends) {
  const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
    const userData = doc.data();
    const chatIds = userData.chats;

    // change friends context
    setFriends(userData.friends);

    if (chatIds.length > 0) {
      setupChatListener(chatIds, setChats, true);

      // attach new listener whenever user doc is updated
      setupChatListener(chatIds, setChats, false);
    }
  });
}
