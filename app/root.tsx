import {
  Alert,
  Box,
  Center,
  Code,
  Container,
  MantineProvider,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import type {
  ErrorBoundaryComponent,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';
import type { FC, PropsWithChildren } from 'react';
import { Fragment } from 'react';

import { Layout } from './components/layout';
import { Navbar } from './components/Navbar';
import { theme } from './utils/theme';

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
type DocumentProps = PropsWithChildren<{ title?: string }>;

const Document: FC<DocumentProps> = (props) => {
  const { children, title } = props;
  return (
    <MantineProvider
      theme={theme}
      withNormalizeCSS
      withGlobalStyles
      emotionOptions={{ key: 'gcoin' }}
      withCSSVariables
    >
      <html lang="en">
        <head>
          {title && <title>{title}</title>}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>

        <body>
          <TypographyStylesProvider>{children}</TypographyStylesProvider>
          <Scripts />
          <ScrollRestoration />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
};

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title="Caught">
      <Layout>
        <Container
          style={{ display: 'flex', justifyItems: 'center', height: '100vh' }}
        >
          {/* <Center> */}
          <Alert
            // icon={<AlertCircle size={16} />}
            title="Bummer!"
            color="red"
            style={{ width: '100%', marginTop: 'auto', marginBottom: 'auto' }}
          >
            <Title order={1}>Caught</Title>
            <Title order={2} color="red">
              Status: {caught.status}
            </Title>
            <Code>{JSON.stringify(caught.data, null, 2)}</Code>
          </Alert>
          {/* </Center> */}
        </Container>
      </Layout>
    </Document>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error, ...props }) => {
  return (
    <Document title="Uh-oh!">
      <Layout>
        <Container className="error-container" size="lg">
          <Title>{error.name}</Title>
          <Code color="red">{error.message}</Code>

          <Code color="red">{error.stack}</Code>
        </Container>
      </Layout>
    </Document>
  );
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export type LayoutProps = PropsWithChildren<DocumentProps>;
