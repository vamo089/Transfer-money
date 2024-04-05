import { Theme } from '@mui/material';
import React from 'react';

interface CustomTheme {
  colors: typeof THEME_COLORS;
  backgrounds: {
    login: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}
