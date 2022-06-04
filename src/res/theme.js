import { StyleSheet } from "react-native";

const colorPalette = {
  primary: "#31AFD4",
  background: "#fff",
  success: "green",
  failure: "red",
};

const theme = {
  colors: colorPalette,
  textVariants: {
    header: {
      fontSize: 32,
      fontWeight: "900",
    },
    headerSmall: {
      fontSize: 24,
      fontWeight: "900",
    },

    body: {
      fontSize: 18,
      fontWeight: "normal",
    },
  },
};

export default theme;
