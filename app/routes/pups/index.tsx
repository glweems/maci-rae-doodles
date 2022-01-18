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
import { PrismaClient } from '@prisma/client';
import { toArray, upperCase } from 'lodash';
import { useMemo } from 'react';
import type { Column } from 'react-table';
import { useTable } from 'react-table';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient();
  const data = await prisma.pup.findMany({});
  return toArray(data);
};

const columns: Column<Pup>[] = [
  {
    Header: 'Avatar',
    accessor: 'avi',
    Cell: ({ value, row }) => (
      <Avatar src={value} alt={`${row.values.name}'s avatar`} />
    ),
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ value }) => <Text bold>{value}</Text>,
  },
  {
    Header: 'Roles',
    accessor: 'roles',
    Cell: ({ value }) => (
      <VStack>
        {value.map((role) => (
          <Badge>{role}</Badge>
        ))}
      </VStack>
    ),
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    Cell: ({ value }) => (
      <Badge color={value === 'MALE' ? 'blue' : 'red'}>{value}</Badge>
    ),
  },
  {
    Header: 'Embark',
    accessor: 'embarkId',
    Cell: ({ value }) => {
      if (!value) return null;
      return (
        <ChakraLink
          href={`https://my.embarkvet.com/dog/${value}`}
          target="_blank"
        >
          <Badge bg="#ffce34">{upperCase(value)}</Badge>
        </ChakraLink>
      );
    },
  },
];
export default function Index() {
  const data = useLoaderData();
  const tableColumns = useMemo(() => columns, [columns]);
  const tableData = useMemo(() => data, [data]);
  console.log('tableData: ', tableData);

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    data: tableData,
    columns: tableColumns,
  });

  return (
    <Container>
      <Table {...getTableProps()}>
        <Thead>
          {tableColumns.map((column) => (
            <Th key={column.id}>{column.Header}</Th>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows?.map((row) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
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
