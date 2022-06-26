import { useState, useEffect } from "react";
import addIcons from "@res/icons";

// contexts
import ChatsContext from "@services/contexts/ChatsContext";
import FriendsContext from "@services/contexts/FriendsContext";
import UserDataContext from "@services/contexts/UserDataContext";
import FriendRequestsContext from "@services/contexts/FriendRequestsContext";

import RootNavigator from "@services/navigation/RootNavigator";
import {
  setupUserDataListener,
  unsubUserData,
  unsubChats,
} from "@services/crud-operations/realtime";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase-config";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  // adds icons to the library
  addIcons();

  // context state
  // setChats is only called in listener function
  const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    async function SetupUserDataListener() {
      if (user) {
        setupUserDataListener(
          auth.currentUser.uid,
          setChats,
          setFriends,
          setUserData,
          setFriendRequests
        );
      } else {
        console.log("unsubbing...");
        unsubChats();
        unsubUserData();
      }
    }
    SetupUserDataListener();
  }, [user]);

  return (
    <FriendRequestsContext.Provider value={friendRequests}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <FriendsContext.Provider value={friends}>
          <ChatsContext.Provider value={{ chats, setChats }}>
            <RootNavigator />
          </ChatsContext.Provider>
        </FriendsContext.Provider>
      </UserDataContext.Provider>
    </FriendRequestsContext.Provider>
  );
}
