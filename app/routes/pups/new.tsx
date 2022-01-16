import { LoaderFunction, useLoaderData } from 'remix';
import { PupForm } from '~/components/PupForm';
import { FormSelectOption } from '~/components/SelectInput';
import { getReqFormData } from '~/utils/selectData';

export let loader: LoaderFunction = async () => await getReqFormData();

type Data = Record<'breeds' | 'dads' | 'moms', FormSelectOption[]>;

export default function NewPupRoute() {
  const { breeds, dads, moms } = useLoaderData<Data>();

  return <PupForm breeds={breeds} dads={dads} moms={moms} />;
}
