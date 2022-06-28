import { StyleSheet } from "react-native";
import theme from "@res/theme";

const styles = StyleSheet.create({
  friendRequestsTag: {
    backgroundColor: theme.colors.trinary,
    padding: 5,
    borderRadius: 50,
    height: 30,
    width: 30,
    position: "absolute",
    zIndex: 1,
    right: -5,
    bottom: -5,
  },
  tagText: {
    fontWeight: "800",
    fontSize: 15,
    textAlign: "center",
    color: theme.colors.background,
  },
});

export default styles;
