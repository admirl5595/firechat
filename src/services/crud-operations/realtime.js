import { query, collection, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "@firebase-config";
import { getProfilePicture, getUserData } from "./users";
import { auth } from "@firebase-config";

// global unsubscribe variables
let unsubChatsRef;
let unsubUserDataRef;

// listens for changes in a users chat documents (filtered by chatIds parameter)
// changes trigger context updates
export function setupChatListener(chatIds, setChats) {
  // query chats which the user is a member of
  const q = query(collection(db, "chats"), where("id", "in", chatIds));

  unsubChatsRef = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      console.log("chats data updated");
      console.log(change.type);

      // get document that changed
      let chat = change.doc.data();

      // check if chat has 2 members, set name to other user's name and picture
      // else, pass
      if (chat.members.length === 2) {
        let chatMembers = chat.members;

        let otherUserId = chatMembers.filter(
          (id) => id !== auth.currentUser.uid
        )[0];
        let otherUser = await getUserData(otherUserId);

        chat.name = otherUser.fName;

        // set chat image
        const image = await getProfilePicture(otherUser.id);
        chat.image = image;
      }

      // get document id
      const id = change.doc.id;

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
}

// listen for changes in user document (friend requests and chats)
export async function setupUserDataListener(
  userId,
  setChats,
  setFriends,
  setUserData,
  setFriendRequests
) {
  unsubUserDataRef = onSnapshot(doc(db, "users", userId), async (doc) => {
    const userData = doc.data();
    const chatIds = userData.chats;

    // TODO: use user context to see if chats was changed
    unsubChats();

    if (chatIds.length > 0) {
      setupChatListener(chatIds, setChats);
    }

    const profilePicture = await getProfilePicture(userId);

    setUserData({
      fName: userData.fName,
      lName: userData.lName,
      email: userData.email,
      profilePicture: profilePicture,
    });
    setFriendRequests(userData.incomingFR);
    // TODO: use user context to see if friends was changed
    // change friends context
    setFriends(userData.friends);
  });
}

export function unsubUserData() {
  if (unsubUserDataRef) {
    unsubUserDataRef();
  }
}

export function unsubChats() {
  if (unsubChatsRef) {
    unsubChatsRef();
  }
}
