import { load } from 'ts-dotenv';

export const env = load({
  AIRTABLE_API_KEY: String,
  GOOGLE_CLIENT_ID: String,
  AIRTABLE_BASE_ID: String,
});

export type Env = typeof env;
