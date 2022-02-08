import { Wrap, WrapItem } from '@chakra-ui/react';
import type { FieldSet } from 'airtable';
import { nanoid } from 'nanoid';
import { Fragment } from 'react';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Dog } from '~/types';
import { db } from '~/utils/db.server';
import { camelize } from '~/utils/helpers';

import { Heros } from '../components/Heros';
import { DogCard } from './DogCard';

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
  console.log('dogs: ', dogs);
  // throw new Error('This is an error');
  return (
    <Fragment>
      <Heros />
      {/* <ReactJson dog={dogs} /> */}
      <Wrap spacing="30px" justify="center">
        {dogs.map((dog) => {
          return (
            <WrapItem key={nanoid()}>
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
            </WrapItem>
          );
        })}
      </Wrap>
    </Fragment>
  );
}
