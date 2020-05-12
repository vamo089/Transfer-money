import React, { useState } from "react";
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { theme } from "helpers/theme";
import { MainButton } from "components/MainButton";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { authValues, token } from "components/Auth";
import { object, ref, string } from "yup";
import { registrationRequest } from "services/registrationRequest";
import cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { RegistrationFields } from "components/RegistrationFields";
import { ROUTES } from "helpers/constants";
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

const schema = object({
  username: string().min(3).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  confirmPassword: string()
    .min(6)
    .oneOf([ref("password"), null])
    .required(),
});

export const Registration = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const onSubmit = (values: { username: string; email: string; password: string; confirmPassword?: string; }) => {
    const { username, email, password } = values;
    setMainButtonLoader(true);
    registrationRequest(username, password, email)
      .then(({ id_token }) => {
        cookies.set("token", id_token);
        history.push(ROUTES.account);
        token.set(id_token);
      })
      .catch(({ response }) => enqueueSnackbar(response.data, { variant: "error" }))
      .finally(() => setMainButtonLoader(false));
  };

  return (
    <Container>
      <Formik
        validateOnMount
        initialValues={{
          username: "",
          email: authValues.get()?.email || "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, values, isValid, handleChange }) => {
          authValues.set(
            !errors.email && values.email ? { email: values.email } : null
          );
          return (
            <Container>
              <Form>
                <RegistrationFields
                  values={values}
                  handleChange={handleChange}
                />
                <MainButton
                  type="submit"
                  disabled={!isValid}
                  loader={mainButtonLoader ? 1: 0}
                  variant="outlined"
                  fullWidth
                >
                  Registration
                </MainButton>
                <SubText>
                  Do you have an account?{" "}
                  <Link to={ROUTES.login}>Sign in here</Link>
                </SubText>
              </Form>
            </Container>
          );
        }}
      </Formik>
    </Container>
  );
};
