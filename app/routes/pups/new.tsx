import { toNumber } from 'lodash';
import type { ActionFunction, LoaderFunction } from 'remix';
import { redirect, useLoaderData } from 'remix';

import { PupForm } from '~/components/PupForm';
import type { FormSelectOption } from '~/components/SelectInput';
import { getReqFormData } from '~/utils/selectData';
import { supabase } from '~/utils/supabase.server';

export const loader: LoaderFunction = async () => await getReqFormData();
export const action: ActionFunction = async ({ request }) => {
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
    gender: formData.get('gender'),
  };
  const { data } = await supabase.from('pups').insert(pup).single();

  return redirect(`/pups/${data.id}`);
};

type Data = Record<'breeds' | 'dads' | 'moms', FormSelectOption[]>;

export default function NewPupRoute() {
  const data = useLoaderData<Data>();

  return <PupForm {...data} />;
}
