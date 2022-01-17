import { createTheme } from '@vanilla-extract/css';

export const [theme, vars] = createTheme({
  color: {
    brand: 'blue',
  },
  font: {
    body: 'arial',
  },
});
