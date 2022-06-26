import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "@firebase-config";
import { addChat } from "./chats";
import { getUserData } from "./users";
import { Alert } from "react-native";

export const addFriend = async (uid) => {
  // add outgoingFR to current user
  const currentUserDocRef = doc(db, "users", auth.currentUser.uid);

  let res = await updateDoc(currentUserDocRef, {
    outgoingFR: arrayUnion(uid),
  });

  const otherUserDocRef = doc(db, "users", uid);

  // add incomingFR to other user
  res = await updateDoc(otherUserDocRef, {
    incomingFR: arrayUnion(auth.currentUser.uid),
  });
};

// uid of other user
export const declineFR = async (uid) => {
  const currentUser = auth.currentUser;

  const currentUserDocRef = doc(db, "users", currentUser.uid);
  const otherUserDocRef = doc(db, "users", uid);

  // remove incomingFR and outgoingFR from both documents (in case of inconsistency)
  let res = await updateDoc(currentUserDocRef, {
    incomingFR: arrayRemove(uid),
  });

  res = updateDoc(otherUserDocRef, {
    outgoingFR: arrayRemove(currentUser.uid),
  });
};

export const acceptFR = async (uid) => {
  const currentUser = auth.currentUser;

  // check if users are already friends
  let AreFriends = await areFriends(currentUser.uid, uid);

  if (AreFriends) {
    Alert.alert("already friends");
    return;
  }

  // get current user document
  const currentUserData = await getUserData(currentUser.uid);

  // get other users' user docuement
  const otherUserData = await getUserData(uid);

  // get fName and lName for both users and store in object
  let currentUserFriendData = {
    id: currentUser.uid,
    fName: currentUserData.fName,
    lName: currentUserData.lName,
  };

  let otherUserFriendData = {
    id: uid,
    fName: otherUserData.fName,
    lName: otherUserData.lName,
  };

  // create chat and add to chats array for each user
  const chatId = await addChat(currentUserFriendData, otherUserFriendData);

  const currentUserDocRef = doc(db, "users", currentUser.uid);
  const otherUserDocRef = doc(db, "users", uid);

  // remove incomingFR and outgoingFR from both documents (in case of inconsistency)
  let res = await updateDoc(currentUserDocRef, {
    outgoingFR: arrayRemove(uid),
    incomingFR: arrayRemove(uid),
    friends: arrayUnion(otherUserFriendData),
    chats: arrayUnion(chatId),
  });

  res = updateDoc(otherUserDocRef, {
    outgoingFR: arrayRemove(currentUser.uid),
    incomingFR: arrayRemove(currentUser.uid),
    friends: arrayUnion(currentUserFriendData),
    chats: arrayUnion(chatId),
  });
};

export const areFriends = async (currentUserUid, otherUserUid) => {
  const currentUserDocRef = doc(db, "users", currentUserUid);
  const userDoc = await getDoc(currentUserDocRef);

  const userData = userDoc.data();

  // get list of friend uids
  const friendIds = userData.friends.map((friend) => friend.id);

  // check if uid list includes other user
  return friendIds.includes(otherUserUid);
};

export const requestSent = async (currentUserUid, otherUserUid) => {
  const currentUserDocRef = doc(db, "users", currentUserUid);
  const userDoc = await getDoc(currentUserDocRef);

  const userData = userDoc.data();

  // get list of friend uids
  const outgoingFR = userData.outgoingFR;

  // check if uid list includes other user
  return outgoingFR.includes(otherUserUid);
};
