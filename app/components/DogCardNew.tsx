import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Circle,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import PillPity from 'pill-pity';
import { AiOutlineMessage } from 'react-icons/ai';
import { useNavigate } from 'remix';

import { numDisplay, USDollar } from '~/utils/helpers';
/*import PillPity from 'pill-pity';
 <Link aria-label="inquire" href={inquireForm} target="_blank">
   Inquire
 </Link>;

  <HStack>
    {colors.map((color) => (
      <Badge key={nanoid()}>{color}</Badge>
    ))}
  </HStack>
 */
export const DogCard = (props) => {
  const avi =
    props?.images?.[0]?.thumbnails?.large?.url ??
    'https://source.boringavatars.com';
  const navigate = useNavigate();
  const { name, id, images, breed, sex, price } = props;
  console.log('price: ', price);
  const formattedPrice = price || numDisplay(price);
  const isMale = sex === 'MALE';
  const sexColor = isMale ? 'blue' : 'pink';
  console.log('sex: ', sex);
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image src={avi} alt={`Picture of ${name}`} roundedTop="lg" />

        <Box p="6">
          <Stat>
            <StatLabel>Collected Fees</StatLabel>
            <StatNumber>£0.00</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Flex justifyContent="space-between"> </Flex>

          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
            <chakra.a href={'#'} display={'flex'}>
              <Icon as={AiOutlineMessage} h={7} w={7} alignSelf={'center'} />
            </chakra.a>
          </Flex>

          <Flex justifyContent="space-between" alignItems="end">
            {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
            <Box>
              <Box as="span" ml="2" color="gray.600">
                {breed}
              </Box>
            </Box>
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                $
              </Box>
              {formattedPrice}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

/*
<Box
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <PillPity
        pattern="formal-invitation"
        h="60px"
        w={'full'}
        objectFit={'cover'}
        bgColor={sex === 'MALE' ? 'blue.800' : 'pink.900'}
        patternFill={sex === 'MALE' ? 'blue.400' : 'pink.400'}
      />
      <Flex justify={'center'} mt={-12}>
        <Avatar
          size={'2xl'}
          src={avi}
          loading="lazy"
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'4xl'} fontWeight={500} fontFamily={'body'}>
            John Doe
          </Heading>
          <Text color={'gray.500'}>Frontend Developer</Text>
        </Stack>

        <Stack direction={'row'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              Followers
            </Text>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>23k</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              Followers
            </Text>
          </Stack>
        </Stack>

        <Button
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Follow
        </Button>
      </Box>
    </Box>


<Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${initialImage})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
          onClick={(e) => navigate(`/dogs/${id}`)}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={initialImage}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text
            color={props.sex === 'MALE' ? 'blue.300' : 'pink.300'}
            fontSize={'sm'}
            textTransform={'uppercase'}
          >
            {props.sex}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <Text color={'gray.600'}>{price}</Text>
        </Stack>
      </Box>
    </Center>
*/
