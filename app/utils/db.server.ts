import Airtable from 'airtable';
import type { AirtableBase } from 'airtable/lib/airtable_base';

import { env } from './env';

Airtable.configure({
  apiKey: env.AIRTABLE_API_KEY,
});
export const base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(
  env.AIRTABLE_BASE_ID,
);

let db: AirtableBase;

declare global {
  // eslint-disable-next-line no-var
  var __db: AirtableBase | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = base;
} else {
  if (!global.__db) {
    const base = Airtable.base(env.AIRTABLE_BASE_ID);
    global.__db = base;
  }
  db = global.__db;
}

export { db };
