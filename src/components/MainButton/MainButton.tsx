import { Button as _Button, CircularProgress } from "@mui/material";
import { theme } from "helpers/theme";
import React from "react";
import styled from "styled-components";

export const Button = styled(({ ...props }) => (
  // eslint-disable-next-line react/jsx-pascal-case
  <_Button classes={{ label: "label", disabled: "disabled" }} {...props} />
))`
  color: ${theme.colors.primary} !important;
  border-color: ${theme.colors.primary} !important;
  background-color: ${theme.colors.blue} !important;
  border: 1px solid ${theme.colors.blue} !important;
  height: 60px;
  text-transform: uppercase;
  font-size: 17px !important;
  font-family: "SF-Regular", sans-serif !important;
  letter-spacing: 2px !important;
  &:hover {
    background-color: ${theme.colors.blue} !important;
  }
  & .label {
    color: ${theme.colors.primary};
  }

  &.disabled {
    color: black;
    .label {
      color: #ccc;
    }
  }
  svg {
    color: ${theme.colors.primary};
  }
`;

interface Props {
  loader: boolean;
  children: React.ReactNode;
}

export const MainButton = (props: any) => {
  const { loader, children }: Props = props;
  return (
    <Button variant="contained" {...props}>
      {loader ? <CircularProgress size={24} /> : children}
    </Button>
  );
};
