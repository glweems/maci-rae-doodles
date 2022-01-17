import { destroySession, getSession, supabase } from '~/utils/supabase.server';
import { LoaderFunction, redirect } from 'remix';
import type { ActionFunction } from 'remix';
import { useSupabase } from '~/utils/supabase-client';
import { useEffect } from 'react';

export default function Signout() {
  const supabase = useSupabase();
  useEffect(() => {
    supabase.auth.signOut();
    localStorage.removeItem('supabase.auth.token');
  }, []);
  return <div>You are now signed out.</div>;
}
