import { extendTheme } from '@chakra-ui/react';
import { createTheme } from '@vanilla-extract/css';
export const [theme, vars] = createTheme({
  colorMode: 'dark',
  color: {
    brand: 'blue',
  },
  font: {
    body: 'arial',
  },
});

extendTheme({ theme });
