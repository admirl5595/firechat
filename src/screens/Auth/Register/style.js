import { StyleSheet } from "react-native";
import theme from "@res/theme";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
  },
  btnsContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  text: {
    ...theme.textVariants.body,
    marginVertical: 10,
  },
});

export default styles;
