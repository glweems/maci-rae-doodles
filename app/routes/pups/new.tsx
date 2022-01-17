import { toNumber } from 'lodash';
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from 'remix';
import { PupForm } from '~/components/PupForm';
import { FormSelectOption } from '~/components/SelectInput';
import { getReqFormData } from '~/utils/selectData';
import { supabase } from '~/utils/supabase.server';
const vals = [
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
  'sold',
  'gender',
  'parent'
];
export let loader: LoaderFunction = async () => await getReqFormData();
export let action: ActionFunction = async ({ request }) => {
  console.log('request', request);
  const formData = await request.formData();
  const pup = {
    name: formData.get('name'),
    birthday: formData.get('birthday'),
    colors: formData.get('colors'),
    mom: formData.get('mom'),
    dad: formData.get('dad'),
    breed_id: formData.get('breed_id'),
    avatar: formData.get('avatar'),
    price: formData.get('price') ? toNumber(formData.get('price')) : null,
    available: formData.get('available'),
    embark: formData.get('embark'),
    sold: formData.get('sold'),
    gender: formData.get('gender')
  };
  const { data } = await supabase.from('pups').insert(pup).single();

  console.log('data: ', data);
  return redirect(`/pups/${data.id}`);
};

type Data = Record<'breeds' | 'dads' | 'moms', FormSelectOption[]>;

export default function NewPupRoute() {
  const data = useLoaderData<Data>();

  return <PupForm {...data} />;
}
