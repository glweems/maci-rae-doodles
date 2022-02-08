import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import ReactJson from '~/components/ReactJson';
import type { RawDog } from '~/types';
import { db } from '~/utils/db.server';
import { camelize } from '~/utils/helpers';

const arrFixFields = [
  'breed',
  'birthday',
  'dad',
  'mom',
  'family',
  'breedName',
  'momBreedName',
  'dadBreedName',
];
const fixes = {
  breed: (arr: string[]) => arr?.[0],
  birthday: (arr: string[]) => arr?.[0],
  dad: (arr: string[]) => arr?.[0],
  mom: (arr: string[]) => arr?.[0],
  family: (arr: string[]) => arr?.[0],
  breedName: (arr: string[]) => arr?.[0],
  momBreedName: (arr: string[]) => arr?.[0],
  dadBreedName: (arr: string[]) => arr?.[0],
  birthday: (arr: string[]) => new Date(arr?.[0]).toDateString(),
};

const formatDogFields = (_rawDog: RawDog) => {
  //   const obj = camelize(_rawDog?.fields);

  const dog = {};
  Object.entries(camelize(_rawDog?.fields)).forEach(([key, value]) => {
    if (arrFixFields.includes(key)) {
      dog[key] = fixes[key](value);
    } else {
      dog[key] = value;
    }
  });
  console.log('dog: ', dog);
  return dog;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { dogId } = params;
  const dog = await db('dogs').find(dogId);
  console.log('dog: ', dog);
  console.log('request, params: ', request, params);
  return formatDogFields(dog);
};

type Sex = 'FEMALE' | 'MALE';

const bgGradientSex = (sex: Sex) => {
  const color = sex === 'MALE' ? 'blue' : 'pink';

  const colors = [700, 600, 400, 800].map((num) => [color, num].join('.'));

  const arr = [`${color}.300`, `${color}.400`, `${color}.800`];
  return `linear(to-r, ${colors.join(', ')})`;
};

export default function DogInfoPage() {
  const data = useLoaderData();
  console.log('data: ', data);
  const slides = [
    {
      img: 'https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      img: 'https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      img: 'https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
    {
      img: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      img: 'https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = 'right';

  useEffect(() => {
    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === 'left' ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, []);

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Flex
            w="full"
            bg={useColorModeValue('gray.200', 'gray.600')}
            p={10}
            alignItems="center"
            justifyContent="center"
          >
            <Flex w="full" overflow="hidden" pos="relative">
              <Flex h="400px" w="full" {...carouselStyle}>
                {slides.map((slide, sid) => (
                  <Box
                    key={`slide-${sid}`}
                    boxSize="full"
                    shadow="md"
                    flex="none"
                  >
                    <Text
                      color="white"
                      fontSize="xs"
                      p="8px 12px"
                      pos="absolute"
                      top="0"
                    ></Text>
                    <Image
                      src={slide.img}
                      boxSize="full"
                      backgroundSize="cover"
                    />
                  </Box>
                ))}
              </Flex>
              {/* <Text {...arrowStyles} left="0" onClick={prevSlide}>
                &#10094;
              </Text>
              <Text {...arrowStyles} right="0" onClick={nextSlide}>
                &#10095;
              </Text> */}
            </Flex>
          </Flex>

          {data?.images?.map((image) => (
            <Image
              rounded={'md'}
              alt={'product image'}
              src={image.url}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          ))}
        </Flex>
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
    </Container>
  );
}
