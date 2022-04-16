import { createClient } from '@supabase/supabase-js';
import { createCookieSessionStorage } from "@remix-run/node";

import { env } from './env';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: 'supabase-session',

      // all of these are optional
      expires: new Date(Date.now() + 3600),
      httpOnly: true,
      maxAge: 60,
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: true,
    },
  });

export const setAuthToken = async (request: Request) => {
  let session = await getSession(request.headers.get('Cookie'));

  supabase.auth.setAuth(session.get('access_token'));

  return session;
};
