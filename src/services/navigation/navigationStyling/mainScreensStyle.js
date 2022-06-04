import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const mainScreenStyle = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    fontWeight: "900",
    fontSize: 25,
  },
  headerTintColor: "000",
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <FontAwesomeIcon size={20} icon={"gear"} color={"rgba(0,0,0,0.5)"} />
    </TouchableOpacity>
  ),
});

export default mainScreenStyle;
