import styled from "styled-components";
import { theme } from "helpers/theme";
import React from "react";
import { Box, TextField as _TextField } from "@material-ui/core";

export const TextField = styled((props) => (
  <>
    {/* eslint-disable-next-line react/jsx-pascal-case */}
    <_TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        classes: {
          root: "inputRoot",
          focused: "focused",
        },
      }}
      InputLabelProps={{
        classes: {
          root: "labelRoot",
          focused: "focused",
        },
      }}
    />
    <Box mb="20px" />
  </>
))`
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
