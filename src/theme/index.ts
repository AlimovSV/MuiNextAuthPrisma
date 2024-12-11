'use client';

import { createTheme } from '@mui/material/styles';

import { ruRU as coreRuRU } from '@mui/material/locale';
import { ruRU as gridRuRU } from '@mui/x-data-grid/locales';

import './locales/dayjs';

export default createTheme(
  {
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    colorSchemes: {
      light: true,
      dark: true,
    },
  },
  coreRuRU,
  gridRuRU,
);
