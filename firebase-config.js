// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBNEqqya9P9mncyWfEkzGtdyC2aJH66DM",
  authDomain: "firechat-b540b.firebaseapp.com",
  projectId: "firechat-b540b",
  storageBucket: "firechat-b540b.appspot.com",
  messagingSenderId: "618336809538",
  appId: "1:618336809538:web:ddba026ce0ba848607f3db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
