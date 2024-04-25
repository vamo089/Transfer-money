import { createTheme } from "@mui/material";
import globalBackground from "public/images/background.jpg";
export const THEME_COLORS = {
  primary: "#F1F1F5",
  secondary: "rgba(247, 247, 250, 0.41)",
  tertiary: "#21223B",
  blue: "#36aeea"
};

export const theme = createTheme({
  colors: THEME_COLORS,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: { maxWidth: "100%", height: "auto" }
      }
    }
  },
  backgrounds: {
    login: globalBackground.src
  }
});
