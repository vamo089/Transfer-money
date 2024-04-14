import { Box } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import * as React from "react";

import * as S from "./TextField.styled";

export const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <>
      <S.TextField
        {...props}
        InputProps={{
          ...props.InputProps,
          classes: {
            root: "inputRoot",
            focused: "focused"
          }
        }}
        InputLabelProps={{
          classes: {
            root: "labelRoot",
            focused: "focused"
          }
        }}
      />
      <Box mb="20px" />
    </>
  );
};
