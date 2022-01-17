import { useSupabase } from '~/utils/supabase-client';

export const Navbar = () => {
  const supabase = useSupabase();
  const user = supabase.auth.user();
  if (user) {
    return <header>{user.email}</header>;
  }
  return <header>login</header>;
};
