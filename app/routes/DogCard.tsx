import {
  Badge,
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';

export const DogCard = ({
  name,
  images,
  breed,
  colors,
  notes,
  inquireForm,
  birthday,
}) => {
  const initialImage =
    images?.[0]?.thumbnails?.large?.url ?? 'https://source.boringavatars.com';

  return (
    <Box
      w="sm"
      mx="auto"
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      bg="gray.900"
    >
      <Image
        w="full"
        h={56}
        fit="cover"
        objectPosition="center"
        src={initialImage}
        alt="avatar"
      />

      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={6}
        py={3}
        bg="gray.600"
      >
        {/* <Icon as={MdHeadset} h={6} w={6} color="white" /> */}
        <chakra.h1
          fontSize="xl"
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'white')}
        >
          {name}
        </chakra.h1>

        <chakra.h3
          mx={3}
          color="gray.400"
          fontWeight="bold"
          fontSize="lg"
        ></chakra.h3>
      </Flex>

      <Box py={4} px={6}>
        <HStack>
          {colors.map((color) => (
            <Badge key={nanoid()}>{color}</Badge>
          ))}
        </HStack>
        <chakra.p py={2} color={useColorModeValue('gray.700', 'gray.400')}>
          {notes}
        </chakra.p>

        <Flex
          alignItems="center"
          mt={4}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          {/* <Icon as={icon} h={6} w={6} mr={2} /> */}

          <chakra.h1 px={2} fontSize="sm">
            {breed}
          </chakra.h1>
        </Flex>

        <Flex
          alignItems="center"
          mt={4}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <Link aria-label="inquire" href={inquireForm} target="_blank">
            Inquire
          </Link>
        </Flex>
        <Flex
          alignItems="center"
          mt={4}
          color={useColorModeValue('gray.700', 'gray.200')}
        ></Flex>
      </Box>
    </Box>
  );
};
