import React, { StrictMode } from "react";
import { HashRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import { Normalize } from "styled-normalize";
import styled, { createGlobalStyle } from "styled-components";
import { theme } from "helpers/theme";
import { Provider } from "react-redux";
import store from "store";
import Routing from "components/Routing";
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

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
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
            <StrictMode>
              <Routing />
            </StrictMode>
          </Container>
        </SnackbarProvider>
      </HashRouter>
    </Provider>
  );
};

export default App;
