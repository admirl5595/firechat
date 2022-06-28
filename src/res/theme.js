import { StyleSheet } from "react-native";

const colorPalette = {
  primary: "#31AFD4",
  secondary: "#1F487E",
  trinary: "#FF715B",
  background: "#fff",
  success: "green",
  failure: "red",
};

const theme = {
  colors: colorPalette,
  textVariants: {
    header: {
      fontSize: 42,
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
