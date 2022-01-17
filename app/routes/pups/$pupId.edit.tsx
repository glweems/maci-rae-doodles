import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import { Divider } from '@supabase/ui';
import { useForm } from 'react-hook-form';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Pup } from '~/types';
import { supabase } from '~/utils/supabase.server';

export const loader: LoaderFunction = async ({ params }) => {
  const pup = await supabase
    .from<Pup>('pups')
    .select('*')
    .eq('id', params.pupId)
    .single();

  const breeds = await supabase.from('breeds').select('*');

  const pups = await supabase.from('pups').select('id, female, name');

  return [pup, pups, breeds];
};

export default function PupRoute() {
  const [{ data: pup }, { data: pups }] =
    useLoaderData<ReturnType<typeof loader>>();
  const { register, handleSubmit } = useForm({ defaultValues: pup });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <Container>
      <Heading>{pup.name}</Heading>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input {...register('name')} required />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="breed">Breed</FormLabel>
          <Input {...register('birthday')} type="date" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="mom">Mom</FormLabel>
          <Select label="mom" {...register('mom')}>
            {pups
              .filter((pup) => pup.female)
              .map((pup) => (
                <option key={pup.id}>{pup.name}</option>
              ))}
          </Select>
        </FormControl>
      </form>
    </Container>
  );
}
