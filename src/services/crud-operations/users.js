import { db } from "@firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, getBytes, getStorage } from "firebase/storage";
import { auth, storage } from "@firebase-config";

export async function getUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  const userData = userDoc.data();

  return userData;
}

export async function updateUser(uid, updatedFields) {
  const userDocRef = doc(db, "users", uid);

  const res = await updateDoc(userDocRef, updatedFields);
}

export async function getProfilePicture(uid) {
  let path = "profile-pictures/";

  let storageRef = ref(storage, path + uid);

  let bytes;

  try {
    bytes = await getBytes(storageRef);
    // check for error when fetching image
  } catch (err) {
    console.log(err.code);
    return null;
  }

  let base64String = _arrayBufferToBase64(bytes);

  base64String = "data:image/jpeg;base64," + base64String;

  return base64String;
}

export async function getChatImage(chatId, imageId) {
  let path = "chat-data/" + chatId + "/images/" + imageId;

  let storageRef = ref(storage, path);

  let bytes;

  try {
    bytes = await getBytes(storageRef);
    // check for error when fetching image
  } catch (err) {
    console.log(err.code);
    return null;
  }

  let base64String = _arrayBufferToBase64(bytes);

  base64String = "data:image/jpeg;base64," + base64String;

  return base64String;
}

const _arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
