import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const table = Airtable.base(process.env.AIRTABLE_BASE_ID).table('upcoming');

export const getUpComingLitters = async () => {
  const data = await table.select({ view: 'web' }).firstPage();
  const dogs = [];
  data?.forEach(async ({ id, ...fields }) => {
    // const { ...momImages, dadImages } = fields;
    let dog = { id };
    const keys = [
      'names',
      'embarkIds',
      'embarkUrls',
      'embarkImgUrls',
      'breedNames',
      'birthdays',
    ];
    let mom = {
      /*  images: momImages  */
    };
    let dad = {
      /* images: dadImages */
    };
    Object.entries(fields).forEach(([key, val]) => {
      if (keys.includes(key)) {
        mom[key.slice(0, -1)] = val[0];
        dad[key.slice(0, -1)] = val[1];
      } else {
        dog[key] = val;
      }
    });

    dog['mom'] = mom;
    dog['dad'] = dad;
    dogs.push(dog);
  });
  return dogs;
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
  data: Record<string, any>,
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
