import { db } from "@firebase-config";
import { getDoc, doc } from "firebase/firestore";

export default async function getUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  const userData = userDoc.data();

  return userData;
}
