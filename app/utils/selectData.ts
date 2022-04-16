import type { Dog } from '~/types';

import { supabase } from './supabase.server';

export const getBreeds = async () =>
  await supabase
    .from('breeds')
    .select('id, name')
    .then(({ data }) => data);

export const getDads = async () =>
  await supabase
    .from<Dog>('pups')
    .select('id, name, parent, gender')
    .eq('parent', true)
    .eq('gender', 'MALE')
    .then(({ data }) => data);

export const getMoms = async () =>
  await supabase
    .from<Dog>('Dogs')
    .select('id, name, parent, gender')
    .eq('parent', true)
    .eq('gender', 'FEMALE')
    .then(({ data }) => data);

export const getReqFormData = async () => {
  const breeds = await getBreeds();
  const moms: Dog[] = [];
  const dads: Dog[] = [];
  const parents = await supabase
    .from<Dog>('Dogs')
    .select('id, name, parent, gender')
    .eq('parent', true)
    .then(({ data }) => data);

  parents?.forEach((p) => {
    p.gender === 'MALE' ? dads.push(p) : moms.push(p);
  });

  return { breeds, moms, dads };
};
