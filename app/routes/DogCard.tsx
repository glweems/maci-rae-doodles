import {
  Box,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'remix';
/*
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
  const initialImage =
    props?.images?.[0]?.thumbnails?.large?.url ??
    'https://source.boringavatars.com';
  const navigate = useNavigate();
  const { name, id, images, gender, price } = props;
  return (
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
  );
};
