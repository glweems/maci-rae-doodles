import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  theme,
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import type { MetaFunction } from 'remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';

import { SupabaseProvider } from '~/utils/supabase-client';

import { Navbar } from './components/Navbar';
import styles from './tailwind.css';
import type { Env } from './utils/env';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
export const meta: MetaFunction = () => {
  return { title: 'Maci Rae Doodles' };
};

export const loader = () => {
  const ev = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SERVICE_KEY: process.env.SERVICE_KEY,
  };

  return ev;
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Meta />
        <Links />
      </head>

      <body>
        <main>
          <Layout>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
        </main>
      </body>
    </html>
  );
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const loader = useLoaderData<Env>();

  const supabase = createClient(loader.SUPABASE_URL, loader.SERVICE_KEY);
  return (
    <SupabaseProvider supabase={supabase}>
      <ChakraProvider>
        <Navbar />
        {children}
      </ChakraProvider>
    </SupabaseProvider>
  );
};

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Box>
          <Heading as="h1">There was an error</Heading>
          <pre>{error.message}</pre>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <ChakraProvider>
      <Container>
        <Box>
          <Heading as="h1">
            {caught.status} {caught.statusText}
          </Heading>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
