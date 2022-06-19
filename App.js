import { useState, useEffect } from "react";
import addIcons from "@res/icons";

// contexts
import ChatsContext from "@services/contexts/ChatsContext";
import FriendsContext from "@services/contexts/FriendsContext";

import RootNavigator from "@services/navigation/RootNavigator";
import { setupUserDataListener } from "@services/crud-operations/realtime";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase-config";

export default function App() {
  // adds icons to the library
  addIcons();

  // context state
  // setChats is only called in listener function
  const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    async function SetupUserDataListener() {
      // only listen for events if user is signed in

      if (user) {
        // try: add listener for chat ids, detach chats listener when chat ids is modified and reattach
        setupUserDataListener(auth.currentUser.uid, setChats, setFriends);
      } else {
        // TODO: unsub for changes in chats
      }
    }
    SetupUserDataListener();
  }, [user]);

  return (
    <FriendsContext.Provider value={friends}>
      <ChatsContext.Provider value={chats}>
        <RootNavigator />
      </ChatsContext.Provider>
    </FriendsContext.Provider>
  );
}
