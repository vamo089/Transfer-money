import { css } from "@mui/material";

import { theme } from "~shared/ui/theme";

export const globalStyles = css`
  body {
    background: url(${theme.backgrounds.login}) no-repeat fixed;
    background-size: cover;
  }
`;
