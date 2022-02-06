import { load } from 'ts-dotenv';

export const env = load({
  SUPABASE_URL: String,
  SUPABASE_KEY: String,
  AIRTABLE_API_KEY: String,
  AIRTABLE_BASE_ID: String,
});

export type Env = typeof env;
