import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Text: {
      variants: {
        bold: {
          fontWeight: 'bold',
        },
      },
    },
    Badge: {
      variants: {
        MALE: {
          color: 'blue.50',
          bg: 'blue.500',
        },
        FEMALE: {
          color: 'pink.50',
          bg: 'pink.500',
        },
      },
    },
  },
});
