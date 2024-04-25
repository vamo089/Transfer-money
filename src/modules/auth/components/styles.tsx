// import { fade } from "@material-ui/core";
import { styled } from "@mui/material";

import { theme } from "~shared/ui/theme";

export const Container = styled("div")`
  width: 100%;
  .Auth_subText {
    color: ${theme.colors.primary};
    margin-top: 10px;
    a {
      color: ${theme.colors.blue};
      &:hover {
        color: ${theme.colors.blue};
      }
    }
  }
`;
export const AuthContainer = styled("div")`
  width: 100%;
  height: 100%;
  max-width: 450px;
  background: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 40px;
  box-sizing: border-box;
`;

export const SubText = styled("div")`
  color: ${theme.colors.primary};
  margin-top: 10px;
  a {
    color: ${theme.colors.blue};
    &:hover {
      color: ${theme.colors.blue};
    }
  }
`;
