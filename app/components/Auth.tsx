import { Auth, Button, Typography } from '@supabase/ui';
import { FC } from 'react';
import { supabase } from '../utils/supabase';

const Container: FC<any> = (props) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
};

export default function AuthBasic() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'github']}
        />
      </Container>
    </Auth.UserContextProvider>
  );
}
