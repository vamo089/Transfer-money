import React, { useState } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import { registrationRequest } from "services/registrationRequest";
import cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { ROUTES } from "helpers/constants";
import { history } from "App";
import { Container, Registration } from "components/Registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setEmail, setToken } from "store/actions/auth";

export interface RegistrationInitialValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = object({
  username: string().min(3).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  confirmPassword: string()
    .min(6)
    .oneOf([ref("password"), null])
    .required(),
});

export const RegistrationContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  const savedEmail = useSelector<RootState, string>(
    (state) => state.auth.email
  );

  const initialValues: RegistrationInitialValues = {
    username: "",
    email: savedEmail,
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values: RegistrationInitialValues) => {
    const { username, email, password } = values;
    setMainButtonLoader(true);
    registrationRequest(username, password, email)
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
            <Registration
              values={values}
              isValid={isValid}
              handleChange={handleChange}
              mainButtonLoader={mainButtonLoader}
            />
          );
        }}
      </Formik>
    </Container>
  );
};
