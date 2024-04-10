import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { theme } from 'src/helpers/theme';
import { store } from 'src/store';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
};
export default App;
