import { destroySession, getSession, supabase } from '~/utils/supabase.server';
import { LoaderFunction, redirect } from 'remix';
import type { ActionFunction } from 'remix';

export const action: ActionFunction = async ({ request }) => {
  let session = await getSession(request.headers.get('Cookie'));
  console.log(request.headers.get('Cookie'));
  console.log('session: ', session);
  await supabase.auth.signOut();
  const idk = await destroySession(session);
  console.log('idk: ', idk);
  return redirect('/auth', {
    headers: {
      'Set-Cookie': await destroySession(session)
    }
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  // Redirect to `/` if user tried to access `/signout`
  await supabase.auth.signOut().catch(console.error);
  return redirect('/auth');
};
