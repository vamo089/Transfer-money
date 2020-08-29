import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { theme } from "helpers/theme";
import { ROUTES } from "helpers/constants";
import { MainButton } from "components/MainButton/MainButton";
import { TextField } from "components/TextField/TextField";
import { UseFormMethods } from "react-hook-form";

const Container = styled.div`
  width: 100%;
`;

const SubText = styled.div`
  color: ${theme.colors.primary};
  margin-top: 10px;
  a {
    color: ${fade(theme.colors.blue, 0.8)};
    &:hover {
      color: ${theme.colors.blue};
    }
  }
`;

interface Props {
  isValid: boolean;
  mainButtonLoader: boolean;
  register: UseFormMethods["register"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  emailChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const Login = ({
  emailChange,
  mainButtonLoader,
  isValid,
  onSubmit,
  register,
}: Props) => {
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <TextField
          autoComplete="userName"
          onChange={emailChange}
          variant="outlined"
          name="email"
          label="Email"
          inputRef={register}
          fullWidth
        />
        <TextField
          autoComplete="current-password"
          variant="outlined"
          name="password"
          label="password"
          type="password"
          inputRef={register}
          fullWidth
        />

        <MainButton
          type="submit"
          variant="outlined"
          disabled={!isValid}
          loader={mainButtonLoader ? 1 : 0}
          fullWidth
        >
          Login
        </MainButton>

        <SubText>
          Don't have an account?{" "}
          <Link to={ROUTES.registration}>Sign up here</Link>
        </SubText>
      </form>
    </Container>
  );
};
