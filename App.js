import { useState, useEffect } from "react";
import addIcons from "@res/icons";
import ChatsContext from "@services/ChatsContext";
import RootNavigator from "@services/navigation/RootNavigator";
import {
  setupChatListener,
  setupChatIdsListener,
} from "@services/crud-operations/realtime";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@firebase-config";

export default function App() {
  // adds icons to the library
  addIcons();

  // context state
  // setChats is only called in listener function
  const [chats, setChats] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    async function SetupChatListener() {
      // only listen for events if user is signed in

      if (user) {
        // try: add listener for chat ids, detach chats listener when chat ids is modified and reattach
        setupChatIdsListener(auth.currentUser.uid, setChats);
      } else {
        // TODO: unsub for changes in chats
      }
    }
    SetupChatListener();
  }, [user]);

  return (
    <ChatsContext.Provider value={chats}>
      <RootNavigator />
    </ChatsContext.Provider>
  );
}
