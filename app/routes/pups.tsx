import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { supabase } from '../../utils/supabase';

export const loader: LoaderFunction = async (params) => {
  console.log(params);
  let data = await supabase
    .from('pups')
    .select('*')
    .filter('mom', 'is', null)
    .then((res) => res.data);

  return data;
};

export default function PupsRoute() {
  const pups = useLoaderData();

  return <div>Hello Index Route</div>;
}
