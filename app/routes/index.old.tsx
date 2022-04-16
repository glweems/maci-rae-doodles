import { Container, Wrap, WrapItem } from '@chakra-ui/react';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { FieldSet } from 'airtable';
import { nanoid } from 'nanoid';

import ReactJson from '~/components/ReactJson';
import type { Dog } from '~/types';
import { db } from '~/utils/db.server';
import { camelize } from '~/utils/helpers';

import { DogCard } from '../components/DogCard';

export const loader: LoaderFunction = async () => {
  const data = db<FieldSet>('dogs')
    .select({
      sort: [{ field: 'Name', direction: 'asc' }],
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
          birthday: new Date(birthday[0]).toDateString(),
        };
        return dog;
      });

      return dogs;
    });
  console.log('data: ', data);

  return data;
};

export default function IndexRoute() {
  const dogs = useLoaderData<Dog[]>();
  console.log('dogs: ', dogs);

  return (
    <Container p={3}>
      <ReactJson dog={dogs} test="test" />
      <Wrap spacing="30px" justify="center">
        {dogs.map((dog) => {
          return (
            <WrapItem key={nanoid()}>
              <DogCard
                key={dog.id}
                name={dog.name}
                images={dog.avatar}
                breed={dog.breedName}
                colors={dog.colors}
                birthday={dog.birthday}
                notes={dog.notes}
                inquireForm={dog.inquireForm}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
}
