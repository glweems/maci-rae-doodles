import { Auth } from '@supabase/ui';
import React, { useEffect } from 'react';
import type { ActionFunction } from 'remix';
import { redirect, useSubmit } from 'remix';
import { commitSession, getSession, supabase } from '~/utils/supabase.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const session = await getSession(request.headers.get('supabase-session'));

  session.set('access_token', formData.get('access_token'));
  session.set('uuid', formData.get('uuid'));

  return redirect('/pups', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  });
};

const Container: React.FC = ({ children }) => {
  const submit = useSubmit();

  useEffect(() => {
    if (supabase?.auth?.session()?.user) {
      const formData = new FormData();

      const accessToken = supabase.auth.session()?.access_token;
      const user = supabase.auth.user();
      console.log('user: ', user);

      if (accessToken && user) {
        formData.append('access_token', accessToken);
        formData.append('uuid', user.id);
        submit(formData, { method: 'post', action: '/auth' });
      }
    }
  }, []);

  return <>{children}</>;
};

export default function AuthBasic() {
  return (
    <Container>
      <Auth supabaseClient={supabase} redirectTo="/" />
    </Container>
  );
}
