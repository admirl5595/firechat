import addIcons from "@res/icons";
import ChatContext from "@services/ChatContext";
import RootNavigator from "@services/navigation/RootNavigator";

export default function App() {
  // adds icons to the library
  addIcons();

  return (
    <ChatContext.Provider>
      <RootNavigator />
    </ChatContext.Provider>
  );
}
