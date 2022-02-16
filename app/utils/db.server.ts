import Airtable from 'airtable';
import type { AirtableBase } from 'airtable/lib/airtable_base';
import dotenv from 'dotenv';

import type { DogResponse, Fields as DogFields } from '../types/db/dog';

dotenv.config();
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

let db: AirtableBase;
declare global {
  // eslint-disable-next-line no-var
  var __db: AirtableBase | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID,
  );
  db = base;
} else {
  if (!global.__db) {
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
    global.__db = base;
  }
  db = global.__db;
}

const fixes = {
  birthday: (arr: string[]) => new Date(arr?.[0]).toDateString(),
};
const firstArrFields = [
  'breed',
  'dad',
  'mom',
  'family',
  'breedName',
  'momBreedName',
  'dadBreedName',
  'momEmbarkId',
  'dadEmbarkId',
];

export type FormattedDog = DogFields & {
  momEmbarkId: string;
  dadEmbarkId: string;
  momBreedName: string;
  dadBreedName: string;
  mom: string;
  dad: string;
  birthday: string;
  birthdayLookup: string;
};

export const formatDogFields = (fields: DogFields) => {
  const dog = {};
  Object.entries(fields).forEach(([key, val]) => {
    if (Object.keys(fixes).includes(key)) {
      dog[key] = fixes[key](val);
    } else {
      dog[key] = val;
    }
    if (firstArrFields.includes(key)) {
      dog[key] = val?.[0];
    }
  });

  return dog as FormattedDog;
};

export { db };
