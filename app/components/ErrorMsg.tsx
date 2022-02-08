import { Box, Container, Heading, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import type { ThrownResponse } from 'remix';

import { ContextProvider } from '../root';
type ErrorMsgProps = {
  error?: Error;
  caught?: ThrownResponse;
};
export function ErrorMsg({ caught, error }: ErrorMsgProps) {
  console.error(caught);
  console.error(error);
  return (
    <ContextProvider>
      <Box textAlign="center" py={10}>
        <Container>
          <Heading
            size="3xl"
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, red.700,red.400,red.500)"
            fontWeight="extrabold"
          >
            Whoops!
          </Heading>
          <Heading as="h2" size="xl" mt={6} mb={2}>
            {caught?.status}
          </Heading>
          {/* {stack} */}
          <Text color={'gray.500'}>
            {caught?.statusText}
            {error?.message}
          </Text>

          {error?.stack && (
            <Box
              mt={5}
              p={3}
              borderRadius={4}
              bg="gray.100"
              color="red.500"
              as="pre"
              overflow="auto"
              fontSize="sm"
              textAlign="left"
              fontFamily="mono"
            >
              {error?.stack}
            </Box>
          )}
        </Container>
      </Box>
    </ContextProvider>
  );
}
