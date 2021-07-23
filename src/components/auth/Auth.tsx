import { LoginContainer } from 'components/auth/Login/LoginContainer';
import { ROUTES } from 'helpers/constants';
import { theme } from 'helpers/theme';
import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { RegistrationContainer } from './Registration/RegistrationContainer';

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

export const Auth: React.FC = () => (
  <AuthContainer>
    <Route path={ROUTES.login} component={LoginContainer} />
    <Route path={ROUTES.registration} component={RegistrationContainer} />
  </AuthContainer>
);
