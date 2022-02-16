import type { BoxProps } from '@chakra-ui/react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment } from 'react';

import { theme } from '~/utils/theme';

import { Footer } from './Footer';
import { Navbar } from './Navbar';
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;

export const Layout: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <ContextProvider>
      <Navbar />
      <Box as="main" p={3} overflowX="hidden" h="100vh" {...props}>
        {children}
      </Box>
      <Footer />
    </ContextProvider>
  );
};
