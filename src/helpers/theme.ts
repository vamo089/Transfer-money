import { createTheme } from '@mui/material';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    blue: string;
  };
  backgrounds: {
    login: string;
  };
}
export const themes: Theme = {
  colors: {
    primary: '#F1F1F5',
    secondary: 'rgba(247, 247, 250, 0.41)',
    tertiary: '#21223B',
    blue: '#36aeea'
  },
  backgrounds: {
    login: './images/background.jpg'
  }
};

export const THEME_COLORS = {
  cinnabar: '#E03837'
};

export const theme = createTheme({
  colors: THEME_COLORS,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: { maxWidth: '100%', height: 'auto' }
      }
    }
  },
  backgrounds: {
    login: './images/background.jpg'
  }
});
