import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import type { LoaderFunction, MetaFunction } from 'remix';
import { LinksFunction, ScrollRestoration } from 'remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  useCatch,
} from 'remix';

import { ErrorMsg } from './components/ErrorMsg';
import { Layout } from './components/Layout';
import { theme } from './utils/theme';

// Optional - Check your favicon with the favicon checker

export const meta: MetaFunction = () => {
  const description = `Maci Rae Doodles dog breeding and training`;
  return {
    viewport: 'width=device-width,initial-scale=1',
    description,
    keywords: 'Remix,jokes',
    'twitter:image': 'https://remix-jokes.lol/social.png',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@remix_run',
    'twitter:site': '@remix_run',
    'twitter:title': 'Remix Jokes',
    'twitter:description': description,
  };
};

export const loader: LoaderFunction = ({ request }) => {
  // upgrade people to https automatically
  const url = new URL(request.url);
  const hostname = url.hostname;
  const proto = request.headers.get('X-Forwarded-Proto') ?? url.protocol;

  url.host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    url.host;
  url.protocol = 'https:';

  if (proto === 'http' && hostname !== 'localhost') {
    return redirect(url.toString(), {
      headers: {
        'X-Forwarded-Proto': 'https',
      },
    });
  }
  return {};
};

function Document({
  children,
  title = 'Maci Rae Doodles',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
        <Scripts />
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

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <ChakraProvider theme={theme}>
          <Outlet />
        </ChakraProvider>
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider theme={theme}>
        <ErrorMsg caught={caught} />
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <ChakraProvider theme={theme}>
        <ErrorMsg error={error} />
      </ChakraProvider>
    </Document>
  );
}
