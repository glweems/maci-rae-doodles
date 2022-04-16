import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import { Fragment } from 'react';

import { AppLink } from './AppLink';

export function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const nav = useNavigate();
  return (
    <Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <AppLink to="/">
              {/* <Logo /> */}
              <VisuallyHidden>MRD</VisuallyHidden>
            </AppLink>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              <AppLink to="/">Maci Rae Doodles</AppLink>
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <AppLink to="/dogs">Dogs</AppLink>
            </HStack>
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                  color="gray.100"
                />

                <AppLink to="/">Home</AppLink>
                <AppLink to="/dogs">Dogs</AppLink>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </Fragment>
  );
}
