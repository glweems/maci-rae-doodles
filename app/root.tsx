import { CloseIcon } from '@chakra-ui/icons';
import { Box, ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import { m } from 'framer-motion';
import React from 'react';
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix';
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
import { Navbar } from './components/Navbar';
import styles from './tailwind.css';
import { theme } from './utils/theme';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
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
      </head>
      <body>
        <ContextProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
        </ContextProvider>
      </body>
    </html>
  );
}

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;

export default function App() {
  return (
    <Document>
      <Navbar />
      <Box as="main">
        <Outlet />
      </Box>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log('caught: ', caught);
  const { status, statusText, data } = caught;
  return (
    <ContextProvider>
      <Document title={`${caught.status} ${caught.statusText}`}>
        <Box as="main">
          <ErrorMsg caught={caught} />
        </Box>
      </Document>
    </ContextProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <Box as="main" w="100%" maxW="100vw" overflow="hidden">
        <Navbar />
        <ErrorMsg error={error} />
      </Box>
    </Document>
  );
}
