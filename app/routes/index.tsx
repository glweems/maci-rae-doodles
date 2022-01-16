import {
  Link as ChakraLink,
  Table,
  TableCaption,
  Tbody,
  Td,
  Thead,
  Tr
} from '@chakra-ui/react';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import ReactJson from '~/components/ReactJson';
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
  'breed_id',
  'avatar',
  'price',
  'available',
  'embark',
  'sold'
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
    default:
      return pup[key];
  }
};

export default function Index() {
  const { data } = useLoaderData();

  return (
    <div>
      <Table variant="stripe" colorScheme="teal">
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
                <Td>{render(item, pup)}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ReactJson pups={data} />
    </div>
  );
}
