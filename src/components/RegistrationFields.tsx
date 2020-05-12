import React from "react";
import styled from "styled-components";
import {TextField} from "components/TextField";
const TextFieldAuth = styled(TextField)`
  margin-bottom: 20px;
`;

interface Props {
  values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
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
