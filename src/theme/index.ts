'use client';

import { createTheme } from '@mui/material/styles';

export default createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});
