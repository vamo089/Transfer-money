import { TextField as _TextField } from "@mui/material";
import { styled } from "@mui/material";

import { theme } from "~shared/ui/theme";

export const TextField = styled(_TextField)`
  .inputRoot {
    font-weight: 600;
    color: #000;
  }
  .inputRoot.focused {
    fieldset {
      border-color: ${theme.colors.blue};
    }
  }
  .labelRoot.focused {
    color: ${theme.colors.blue};
  }
`;
