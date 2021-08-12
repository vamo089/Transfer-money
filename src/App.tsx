import { Routing } from 'components/Routing';
import { theme } from 'helpers/theme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'store';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

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
  font-family: 'SF-Regular', sans-serif;
  background: url(${theme.backgrounds.login});
  background-size: cover;
`;

export const history = createBrowserHistory();

const App: React.FC = () => (
  <Provider store={store}>
    <HashRouter>
      <Normalize />
      <GlobalStyle />
      <Container>
        <Routing />
      </Container>
    </HashRouter>
  </Provider>
);

export default App;
