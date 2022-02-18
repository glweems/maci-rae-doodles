import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';

import packageJson from '../package.json';
import { ErrorMsg } from './components/ErrorMsg';
import { theme } from './utils/theme';
export const meta: MetaFunction = () => {
  const { description } = packageJson;
  return {
    viewport: 'width=device-width,initial-scale=1',
    description,
    keywords: 'Remix,jokes',
    'twitter:image': 'https://remix-jokes.lol/social.png',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Maci Rae Doodles',
    'twitter:description': description,
  };
};

export const links: LinksFunction = () => [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#bf1d73' },
];

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

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-219579207-1"
        />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
        <CSSReset />
      </head>

      <body>
        {children}
        <ScrollRestoration />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
      <Scripts />
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
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
