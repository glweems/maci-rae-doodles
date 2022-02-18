import Airtable from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import dotenv from 'dotenv';
import type { Upcoming } from '~/Upcoming';
import type { Fields as DogFields } from '../types/db/dog';

dotenv.config();
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const obj = { hi: 'hi' };
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

type Formatters = {
  firstArrayFields?: string[];
  dates?: string[];
  records?: Record<
    string,
    {
      base?: string;
      firstArrayFields?: string[];
      dates?: string[];
      select?: string[];
    }
  >;
};

export const formatAirtable = (
  data: Record<string, unknown>,
  { firstArrayFields, dates, records }: Formatters,
) => {
  // eslint-disable-next-line prefer-const
  let obj = data;
  Object.entries(data).forEach(async ([key, val]) => {
    if (firstArrayFields?.includes(key)) {
      obj[key] = val?.[0];
    }
    if (dates?.includes(key)) {
      obj[key] = new Date(val);
    }
  });

  return obj;
};

export const retreiveRecord = async (recordId: string, { base }) => {
  return await (
    await db(base).find(recordId)
  ).fields;
};

export const formatUpcomingParents = (item: Upcoming) => {
  const {
    dadImages,
    momImages,
    embarkIds,
    names,
    embarkImgUrls,
    breedNames,
    embarkUrls,
  } = item;
  const [momId, dadId] = embarkIds;
  const [momName, dadName] = names;
  const [momEmbarkUrl, dadEmbarkUrl] = embarkImgUrls;
  const [momBreedName, dadBreedName] = breedNames;
  const [momEmbarkId, dadEmbarkId] = embarkUrls;

  return {
    mom: {
      images: momImages,
      name: momName,
      id: momId,
      breedName: momBreedName,
      embarkUrl: momEmbarkUrl,
      embarkId: momEmbarkId,
    },
    dad: {
      images: dadImages,
      name: dadName,
      id: dadId,
      breedName: dadBreedName,
      embarkUrl: dadEmbarkUrl,
      embarkId: dadEmbarkId,
    },
  };
};

export { db };
