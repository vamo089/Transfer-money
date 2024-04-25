import { THEME_COLORS } from "~shared/ui/theme";

interface CustomTheme {
  colors: typeof THEME_COLORS;
  backgrounds: {
    login: string;
  };
}

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}
