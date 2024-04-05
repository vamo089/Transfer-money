import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AppProps } from 'next/app';
import { theme } from 'src/helpers/theme';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
export default App;
