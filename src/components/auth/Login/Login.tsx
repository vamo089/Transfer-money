import React from "react";
import { Link } from "react-router-dom";
import { Form } from "formik";
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { theme } from "helpers/theme";
import { ROUTES } from "helpers/constants";
import { MainButton } from "components/MainButton/MainButton";
import { TextField } from "components/TextField/TextField";
import { LoginInitialValues } from "./LoginContainer";
import { FormikHandlers } from "formik/dist/types";

export const Container = styled.div`
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
  values: LoginInitialValues;
  isValid: boolean;
  mainButtonLoader: boolean;
  handleChange: FormikHandlers["handleChange"];
}

export const Login = ({
  values,
  mainButtonLoader,
  isValid,
  handleChange,
}: Props) => {
  return (
    <Form>
      <TextField
        variant="outlined"
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        variant="outlined"
        name="password"
        label="password"
        type="password"
        value={values.password}
        onChange={handleChange}
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
    </Form>
  );
};
