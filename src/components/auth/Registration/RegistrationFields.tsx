import React from "react";
import styled from "styled-components";
import { TextField } from "components/TextField/TextField";
import { RegistrationInitialValues } from "./RegistrationContainer";
import { FormikHandlers } from "formik/dist/types";
const TextFieldAuth = styled(TextField)`
  margin-bottom: 20px;
`;

interface Props {
  values: RegistrationInitialValues;
  handleChange: FormikHandlers["handleChange"];
}

export const RegistrationFields = ({ values, handleChange }: Props) => {
  return (
    <>
      <TextFieldAuth
        variant="outlined"
        name="username"
        label="Name"
        value={values.username}
        onChange={handleChange}
        fullWidth
      />
      <TextFieldAuth
        variant="outlined"
        name="email"
        type="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        fullWidth
      />
      <TextFieldAuth
        variant="outlined"
        name="password"
        type="password"
        label="Password"
        value={values.password}
        onChange={handleChange}
        fullWidth
      />

      <TextFieldAuth
        variant="outlined"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        value={values.confirmPassword}
        onChange={handleChange}
        fullWidth
      />
    </>
  );
};
