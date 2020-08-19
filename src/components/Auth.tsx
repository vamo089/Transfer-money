import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { theme } from "helpers/theme";
import { createState } from "helpers/createState";
import { ROUTES } from "helpers/constants";
import LoginContainer from "components/Login/LoginContainer";
import { RegistrationContainer } from "./Registration/RegistrationContainer";

const AuthContainer = styled.div`
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

export const token = createState<string | null>(null);
export const Auth = () => {
  return (
    <AuthContainer>
      <Route path={ROUTES.login} component={LoginContainer} />
      <Route path={ROUTES.registration} component={RegistrationContainer} />
    </AuthContainer>
  );
};
