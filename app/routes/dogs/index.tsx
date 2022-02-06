import {
  Avatar,
  Badge,
  Container,
  Link as ChakraLink,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import type { Pup } from '@prisma/client';
import { useMemo } from 'react';
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter';
import type { Column } from 'react-table';
import { useTable } from 'react-table';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import ReactJson from '~/components/ReactJson';
import { db } from '~/utils/db.server';
import { camelize } from '~/utils/helpers';

import type { LoaderData } from '..';

export const loader: LoaderFunction = () => {
  const dogs: LoaderData[] = db('dogs')
    .select({
      // Selecting the first 3 records in Grid view:
      sort: [{ field: 'Name', direction: 'asc' }],
    })
    .all()
    .then((_dogs) => _dogs.map((_dog) => camelize(_dog.fields)));
  //

  return dogs;
};

const columns: Column<Pup>[] = [
  {
    Header: 'Avatar',
    accessor: 'avatar',
    Cell: ({ value, row }) => {
      return (
        <>
          <Avatar
            src={value?.[0].thumbnails?.large.url}
            alt={`${row.values.name}'s avatar`}
          />
        </>
      );
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ value }) => <Text bold>{value}</Text>,
  },

  {
    Header: 'Gender',
    accessor: 'gender',
    Cell: ({ value }) => <Badge variant={value}>{value}</Badge>,
  },
  {
    Header: 'Embark',
    accessor: 'embarkUrl',
    Cell: ({ value, row }) => {
      if (!value) return null;
      return (
        <ChakraLink href={value} target="_blank">
          <Badge bg="#ffce34" color="black">
            {row.original.embarkId}
          </Badge>
        </ChakraLink>
      );
    },
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: ({ value }) => {
      return <Text>{value.toString()}</Text>;
    },
  },
  {
    Header: 'Birthday',
    accessor: 'birthday',
    Cell: ({ value }) => {
      console.log('value: ', value);
      return <Text>{}</Text>;
    },
  },
];
export default function Index() {
  const data = useLoaderData();

  const tableColumns = useMemo(() => columns, [columns]);
  const tableData = useMemo(() => data, data);

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    data: tableData,
    columns: tableColumns,
  });

  return (
    <Container>
      <Table {...getTableProps()}>
        <Thead>
          {tableColumns?.map((column) => (
            <Th key={column.id}>{column.Header}</Th>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows?.map((row) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()}>
                {row?.cells?.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
}
