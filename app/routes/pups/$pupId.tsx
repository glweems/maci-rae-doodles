import { Button, Container, Heading } from '@chakra-ui/react';
import { Divider } from '@supabase/ui';
import { LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Pup } from '~/types';
import { supabase } from '~/utils/supabase';

export let loader: LoaderFunction = async ({ params }) => {
  const pup = await supabase
    .from<Pup>('pups')
    .select('*')
    .eq('id', params?.pupId as string)
    .single();

  return pup;
};

export default function PupRoute() {
  const navigate = useNavigate();
  const { data } = useLoaderData();
  return (
    <Container>
      <Heading>{data.name}</Heading>
      <Button onClick={(e) => navigate(`/pups/${data.id}/edit`)}>edit</Button>
      <Divider />
      <p>
        Why don't you find hippopotamuses hiding in trees? They're really good
        at it.
      </p>
    </Container>
  );
}
