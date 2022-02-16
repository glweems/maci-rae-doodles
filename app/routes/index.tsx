import {
  Center,
  Heading,
  SimpleGrid,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import type { Token } from '@chakra-ui/styled-system/dist/declarations/src/utils';
import type { FieldSet } from 'airtable';
import type CSS from 'csstype';
import { nanoid } from 'nanoid';
import PillPity from 'pill-pity';
import { Fragment } from 'react';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import { DogCard } from '~/components/DogCardNew';
import { Hero } from '~/components/Hero';
import { Layout } from '~/components/Layout';
import type { Dog } from '~/types';
import { db } from '~/utils/db.server';
import { camelize } from '~/utils/helpers';

type GradientEntry = [Token<CSS.Property.Color, 'colors'>, number];

export const gradientColorProp = (arr: GradientEntry[]) => {
  const entries = arr.map(([color, num]) => [color, num].join('.')).join(', ');
  const val = `linear(to-r, ${entries})`;

  return val;
};

export const loader: LoaderFunction = async () => {
  const data = db<FieldSet>('dogs')
    .select({
      sort: [{ field: 'name', direction: 'asc' }],
      view: 'Available',
    })
    .all()
    .then((_dogs) => {
      const dogs = _dogs.map((_dog) => {
        const { breedName, birthday, ...fields }: any = camelize(_dog.fields);

        const dog = {
          ...fields,
          breedName: breedName?.[0],
          colors: fields.color.split(',').map((color) => color.trim()),
          birthday: new Date(birthday?.[0]).toDateString(),
        };
        return dog;
      });

      return dogs;
    });

  return data;
};

export default function IndexRoute() {
  const dogs = useLoaderData<Dog[]>();

  // throw new Error('This is an error');
  return (
    <Layout>
      <Center>
        <Heading as="h1" size="3xl">
          Maci Rae Doodles
        </Heading>
      </Center>
      {/* <ReactJson dog={dogs} /> */}
      <SimpleGrid columns={[0, 1, 2]} spacing={3}>
        {dogs.map((dog) => {
          return (
            <DogCard
              key={nanoid()}
              id={dog.recordId}
              name={dog.name}
              images={dog.images}
              breed={dog.breedName}
              colors={dog.colors}
              birthday={dog.birthday}
              notes={dog.notes}
              inquireForm={dog.inquireForm}
              sex={dog.sex}
              price={dog.price}
            />
          );
        })}
      </SimpleGrid>
    </Layout>
  );
}
