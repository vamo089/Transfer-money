import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import cookies from "js-cookie";
import { Normalize } from "styled-normalize";
import styled, { createGlobalStyle } from "styled-components";
import { Auth } from "components/Auth";
import { Account } from "components/Account";
import { theme } from "helpers/theme";
import { ROUTES } from "helpers/constants";
import { Provider } from "react-redux";
import store, { getState } from "store";
const GlobalStyle = createGlobalStyle`
body{
  @font-face {
    src: url('./fonts/SF-Regular.otf');
    font-family: 'SF-Regular';
}
  width: 100vw;
  height: 100vh;
}
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  text-align: center;
  font-family: "SF-Regular", sans-serif;
  background: url(${theme.backgrounds.login});
  background-size: cover;
`;

export const history = createBrowserHistory();

function App() {
  const isTokenExist = getState.auth.token || cookies.get("token");

  return (
    <Provider store={store}>
      <Router history={history}>
        <Normalize />
        <GlobalStyle />

        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Container>
            <Redirect
              from="*"
              to={isTokenExist ? ROUTES.account : ROUTES.login}
            />

            {isTokenExist ? (
              <Route to={ROUTES.account} component={Account} />
            ) : (
              <Auth />
            )}
          </Container>
        </SnackbarProvider>
      </Router>
    </Provider>
  );
}

export default App;
