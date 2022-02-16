import {
  Box,
  Button,
  chakra,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export function Heros() {
  return (
    <Box px={8} py={24} mx="auto">
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: 'left', md: 'center' }}
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          BEST{' '}
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            BERNEDOODLES
          </Text>{' '}
          IN TX
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          Hellonext is a feature voting software where you can allow your users
          to vote on features, publish roadmap, and complete your customer
          feedback loop.
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: 'left', md: 'center' }}
        ></Stack>
      </Box>
      <Box
        w={{ base: 'full', md: 10 / 12 }}
        mx="auto"
        mt={20}
        textAlign="center"
      >
        {/* <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          src="https://kutty.netlify.app/hero.jpg"
          alt="Hellonext feedback boards software screenshot"
        /> */}
      </Box>
    </Box>
  );
}
