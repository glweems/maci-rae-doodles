import { ChakraProvider } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from 'remix';
import { SupabaseProvider } from '~/utils/supabase-client';
import styles from './tailwind.css';
import { env, Env } from './utils/env';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

export const loader = () => {
  return {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SERVICE_KEY: process.env.SERVICE_KEY
  };
};

export default function App() {
  const loader = useLoaderData<Env>();
  console.log('loader: ', loader);

  const supabase = createClient(loader.SUPABASE_URL, loader.SERVICE_KEY);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Meta />
        <Links />
      </head>
      <ChakraProvider>
        <SupabaseProvider supabase={supabase}>
          <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <main>
              <Navbar />
              {process.env.NODE_ENV === 'development' && <LiveReload />}
            </main>
          </body>
        </SupabaseProvider>
      </ChakraProvider>
    </html>
  );
}

const Navbar = () => {
  return <header></header>;
};

/* function Layout({ children }: React.PropsWithChildren<{}>) {
  const submit = useSubmit();
  const supabase = useSupabase();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => {
      submit(null, { method: 'post', action: '/signout' });
    });
  };
  console.log('supabase.auth.session(): ', supabase.auth.session());
  const toggle = () => {
    const isMenuOpen = searchParams.get('menu') === 'true';
    isMenuOpen ? setSearchParams({}) : setSearchParams({ menu: 'true' });
  };
  return (
    <main>
      <Flex color="white">
        <Center w="100px" bg="green.500">
          <Text>Box 1</Text>
        </Center>
        <Square bg="blue.500" size="150px">
          <Text>Box 2</Text>
        </Square>
        <Box flex="1" bg="tomato">
          <Text>Box 3</Text>
        </Box>
      </Flex>
      {children}
    </main>
  );
}
 */
