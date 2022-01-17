import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Container,
  Image,
  Link as ChakraLink,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';
import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';

import type { Pup } from '~/types';
import { supabase } from '~/utils/supabase.server';

export const loader: LoaderFunction = async () => {
  const pup = await supabase.from<Pup>('pups').select('*');

  return pup;
};
const tbl: Array<keyof Pup> = [
  'avatar',
  'name',
  'birthday',
  'mom',
  'dad',
  'breed_id',
  'price',
  'available',
  'embark',
  'sold',
  'parent',
];

const render = (key: keyof Pup, pup: Pup) => {
  switch (key) {
    case 'name':
      return <Link to={`/pups/${pup.id}`}>{pup.name}</Link>;
    case 'embark':
      return pup.embark ? (
        <ChakraLink href={pup.embark} target="_blank">
          embark
        </ChakraLink>
      ) : (
        '-'
      );
    case 'avatar':
      return (
        <Image borderRadius="full" boxSize="50px" src={pup.avatar} alt="pup" />
      );
    case 'parent':
      return pup.parent ? <CheckIcon /> : <CloseIcon />;
    default:
      return pup[key];
  }
};

export default function Index() {
  const { data } = useLoaderData();

  return (
    <Container>
      <Table variant="stripe" colorScheme="teal">
        <Thead>
          <Tr>
            {tbl.map((item) => (
              <Td key={item}>{item}</Td>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((pup: Pup) => (
            <Tr>
              {tbl.map((item) => (
                <Td>{render(item, pup)}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}
