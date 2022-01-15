import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  AvatarBadge,
  Tfoot,
  Link as ChakraLink
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { Pup } from '~/types';
import { supabase } from '~/utils/supabase';

export let loader: LoaderFunction = async ({ params }) => {
  const pup = await supabase.from<Pup>('pups').select('*');

  return pup;
};
const tbl: Array<keyof Pup> = [
  'id',
  'created_at',
  'name',
  'birthday',
  'colors',
  'mom',
  'dad',
  'breed',
  'avatar',
  'price',
  'available',
  'embark',
  'sold'
];

const renderRow = {
  name: ({ name, id }: Pup) => <Link to={`/pups/${id}`}>{name}</Link>,
  embark: (pup: Pup) =>
    pup.embark ? (
      <ChakraLink href={pup.embark} target="_blank">
        embark
      </ChakraLink>
    ) : (
      '-'
    )
};

export default function Index() {
  const { data } = useLoaderData();
  console.log('data: ', data);
  return (
    <Table variant="striped" colorScheme="teal">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
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
              <Td>
                {renderRow[item] !== undefined
                  ? renderRow[item](pup)
                  : pup[item]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
