import { load } from 'ts-dotenv';

export const env = load({
  SUPABASE_URL: String,
  SUPABASE_KEY: String,
});

export type Env = typeof env;
