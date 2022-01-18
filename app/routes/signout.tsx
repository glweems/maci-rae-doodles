import { useEffect } from 'react';

import { useSupabase } from '~/utils/supabase-client';

export default function Signout() {
  const supabase = useSupabase();
  useEffect(() => {
    supabase.auth.signOut();
    localStorage.removeItem('supabase.auth.token');
  }, [supabase.auth]);
  return <div>You are now signed out.</div>;
}
