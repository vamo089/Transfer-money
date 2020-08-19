import React, { useState } from "react";
import { Login, Container } from "components/auth/Login/Login";
import { Formik } from "formik";
import { object, string } from "yup";
import { setEmail, setToken } from "store/actions/auth";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { loginRequest } from "services/loginRequest";
import { ROUTES } from "helpers/constants";
import cookies from "js-cookie";
import { history } from "App";

export interface LoginInitialValues {
  email: string;
  password: string;
}

const validationSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
});

export const LoginContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  const savedEmail = useSelector<RootState, string>(
    (state) => state.auth.email
  );

  const initialValues: LoginInitialValues = {
    email: savedEmail,
    password: "",
  };

  const onSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    setMainButtonLoader(true);
    loginRequest(email, password)
      .then(({ id_token }) => {
        cookies.set("token", id_token);
        history.push(ROUTES.account);
        dispatch(setToken(id_token));
      })
      .catch(({ response }) =>
        enqueueSnackbar(response.data, { variant: "error" })
      )
      .finally(() => setMainButtonLoader(false));
  };

  return (
    <Container>
      <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, values, isValid, handleChange }) => {
          if (!errors.email && values.email && values.email !== savedEmail) {
            dispatch(setEmail(values.email));
          }
          return (
            <Login
              values={values}
              mainButtonLoader={mainButtonLoader}
              handleChange={handleChange}
              isValid={isValid}
            />
          );
        }}
      </Formik>
    </Container>
  );
};

export default LoginContainer;
