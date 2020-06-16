import React, { useState } from "react";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import cookies from "js-cookie";
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { theme } from "helpers/theme";
import { ROUTES } from "helpers/constants";
import { MainButton } from "components/MainButton/MainButton";
import { TextField } from "components/TextField/TextField";
import { authValues, token } from "components/Auth";
import { loginRequest } from "services/loginRequest";
import { useSnackbar } from "notistack";
import { history } from "App";

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

export const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const onSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    setMainButtonLoader(true);
    loginRequest(email, password)
      .then(({ id_token }) => {
        cookies.set("token", id_token);
        history.push(ROUTES.account);
        token.set(id_token);
      })
      .catch(({ response }) => enqueueSnackbar(response.data, { variant: "error" })
      )
      .finally(() => setMainButtonLoader(false));
  };

  return (
    <Container>
      <Formik
        initialValues={{
          email: authValues.get()?.email || "",
          password: "",
        }}
        validationSchema={object({
          email: string().email().required(),
          password: string().min(6).required(),
        })}
        validateOnMount
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, values, isValid, handleChange }) => {
          authValues.set(
            !errors.email && values.email ? { email: values.email } : null
          );
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
                loader={mainButtonLoader ? 1: 0}
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
        }}
      </Formik>
    </Container>
  );
};
