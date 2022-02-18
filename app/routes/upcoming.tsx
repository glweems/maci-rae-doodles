import {
  Box,
  chakra,
  Container,
  Flex,
  Heading,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { Layout } from '~/components/Layout';
import type { UpcomingLittersData } from '~/Upcoming';
import { getUpComingLitters } from '~/utils/api';

export const loader: LoaderFunction = async () => {
  return getUpComingLitters();
};
export default function UpcomingPage() {
  const data = useLoaderData<UpcomingLittersData[]>();
  console.log('data: ', data);

  return (
    <Layout>
      <Container>
        <Heading>Upcoming</Heading>
        <Box as="section">
          <Wrap>
            {data?.map(({ mom, dad }) => {
              return (
                <WrapItem key={nanoid()} w="full">
                  <Dog dog={mom} />
                  <Dog dog={dad} />
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Container>
    </Layout>
  );
}

const Dog = ({ dog }) => {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Flex
        maxW="md"
        w="full"
        mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Box
          w={1 / 3}
          bgSize="cover"
          // bgImage={`url(${dog?.images[0]?.thumbnails?.large?.url})`}
        />

        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
          <chakra.h1
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            {dog?.name}
          </chakra.h1>

          <chakra.p mt={2} fontSize="sm">
            {dog?.breedName}
          </chakra.p>

          <Flex mt={3} alignItems="center" justifyContent="space-between">
            <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
              $220
            </chakra.h1>
            <chakra.button
              px={2}
              py={1}
              bg="white"
              fontSize="xs"
              color="gray.900"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: 'gray.200',
              }}
              _focus={{
                bg: 'gray.400',
              }}
            >
              Add to cart
            </chakra.button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

/*


<Flex>
  <Box>
    <Image src={item.momImages?.[0]?.thumbnails?.large?.url} />
  </Box>
  <Box>
    <Heading>{item.momName}</Heading>
  </Box>
</Flex>
*/
