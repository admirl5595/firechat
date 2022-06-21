import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "@firebase-config";
import { addChat } from "./chats";

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

export const acceptFR = async (uid) => {
  const currentUser = auth.currentUser;

  // get current user document
  const currentUserDocRef = doc(db, "users", currentUser.uid);

  // get other users' user docuement
  const otherUserDocRef = doc(db, "users", uid);

  // get fName and lName for both users and store in object
  let currentUserFriendData = {
    id: currentUser.uid,
    fName: "current",
    lName: "user",
  };

  let otherUserFriendData = {
    id: uid,
    fName: "other",
    lName: "user",
  };

  // create chat and add to chats array for each user
  const chatId = await addChat(currentUserFriendData, otherUserFriendData);

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
  const friendIds = userData.friends.map((friend) => friend.uid);

  console.log(friendIds.includes(otherUserUid));

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
