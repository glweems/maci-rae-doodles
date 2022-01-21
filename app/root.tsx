import { Button } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import type { LinksFunction } from 'remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useSubmit,
} from 'remix';
import { env } from './utils/env';

import { SupabaseProvider, useSupabase } from './utils/supabase-client';

export let links: LinksFunction = () => {
  return [
    // { rel: 'stylesheet', href: tailwindStyles },
    // {
    //   rel: 'stylesheet',
    //   href: appStyles,
    // },
  ];
};

export const loader = () => {
  return env;
};

export default function App() {
  const loader = useLoaderData();

  const supabase = createClient(loader.SUPABASE_URL, loader.SUPABASE_KEY);

  return (
    <Document>
      <SupabaseProvider supabase={supabase}>
        <Layout>
          <Outlet />
        </Layout>
      </SupabaseProvider>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  const submit = useSubmit();
  const supabase = useSupabase();

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => {
      submit(null, { method: 'post', action: '/signout' });
    });
  };

  return (
    <main>
      <header>
        {supabase.auth.session() && (
          <Button type="button" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
      </header>
      {children}
    </main>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = <p>This is a custom error message for 404 pages</p>;
      break;
    // You can customize the behavior for other status codes
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}
