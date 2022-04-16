import { load } from 'ts-dotenv';

export const env = load({
  AIRTABLE_API_KEY: String,
  AIRTABLE_BASE_ID: String,
  NODE_ENV: String,
});

const _vercelUrl = process.env.VERCEL_URL || '';
export const vercelUrl = _vercelUrl.startsWith('https')
  ? _vercelUrl
  : `https://${_vercelUrl}`;

export const isDev: boolean = env.NODE_ENV === 'development';

export const selfUrl: string = isDev ? 'http://localhost:3000' : vercelUrl;

export type Env = typeof env;
