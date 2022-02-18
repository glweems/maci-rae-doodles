import {
  Box,
  Button,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import fs from 'fs';
import Iframe from 'react-iframe';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import { Carousel } from '~/components/Carousel';
import { Layout } from '~/components/Layout';
import { scrapeEmbark } from '~/entry.server';
import type { Sex } from '~/types/db/dog';
import { db, formatDogFields } from '~/utils/db.server';
const embarkImgPath = (id: string) => `/public/embark/${id}.webp`;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { dogId } = params;
  const { fields } = await db('dogs').find(dogId);
  const dog = formatDogFields(fields as any);

  const imgPath = `/${dog?.dadEmbarkId}.png`;

  try {
    const embarkImages = [dog?.momEmbarkId, dog?.dadEmbarkId].map(
      (id) => `public/embark/${id}.webp`,
    );

    const obj = {
      [dog?.momEmbarkId]: embarkImgPath(dog?.momEmbarkId),
      [dog?.dadEmbarkId]: embarkImgPath(dog?.dadEmbarkId),
    };

    Object.entries(obj).forEach(async (id, imgPath) => {
      if (!fs.existsSync(imgPath)) await scrapeEmbark(id);
    });
  } catch (err) {
    console.error(err);
  }

  return { dogId, ...dog };
};

const bgGradientSex = (sex: Sex) => {
  const color = sex === 'MALE' ? 'blue' : 'pink';

  const colors = [700, 600, 400, 800].map((num) => [color, num].join('.'));

  return `linear(to-r, ${colors.join(', ')})`;
};

export default function DogInfoPage() {
  const data = useLoaderData();
  const slides = data.images?.map((img) => img.url);

  return (
    <Layout>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Carousel images={slides} />

        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              size="4xl"
              display={{ base: 'block', lg: 'inline' }}
              w="full"
              bgClip="text"
              bgGradient={bgGradientSex(data?.sex)}
              fontWeight="extrabold"
            >
              {data.name}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {data.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            {/* <MdLocalShipping /> */}
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Layout>
  );
}
