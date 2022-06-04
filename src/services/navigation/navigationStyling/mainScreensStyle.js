import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const mainScreenStyle = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTintColor: "000",
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

export default mainScreenStyle;
