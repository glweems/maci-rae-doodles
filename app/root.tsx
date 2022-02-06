import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix';
import { Links, LiveReload, Meta, Outlet, redirect, Scripts } from 'remix';

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

export const links: LinksFunction = () => {
  return [];
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
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

const ContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default function App() {
  return (
    <Document>
      <ContextProvider>
        <Navbar />
        <Outlet />
      </ContextProvider>
    </Document>
  );
}

// export function CatchBoundary() {
//   const caught = useCatch();
//   console.log('caught: ', caught);

//   return (
//     <Document title={`${caught.status} ${caught.statusText}`}>
//       <ContextProvider>
//         <ErrorMsg {...caught} />
//       </ContextProvider>
//     </Document>
//   );
// }

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.log('error: ', error);
//   console.error(error);

//   return (
//     <Document title="Uh-oh!">
//       <ContextProvider>
//         <ErrorMsg statusText={error} />
//       </ContextProvider>
//     </Document>
//   );
// }

// export function ErrorMsg({ data, status, statusText }) {
//   return (
//     <Box textAlign="center" py={10} px={6}>
//       <Box display="inline-block">
//         <Flex
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="center"
//           bg={'red.500'}
//           rounded={'50px'}
//           w={'55px'}
//           h={'55px'}
//           textAlign="center"
//         >
//           <CloseIcon boxSize={'20px'} color={'white'} />
//         </Flex>
//       </Box>
//       <Heading as="h2" size="xl" mt={6} mb={2}>
//         {_.toString(status)}
//       </Heading>
//       <Text color={'gray.500'}>{_.toString(statusText))}</Text>
//       {data && <ReactJson {...data} />}
//     </Box>
//   );
// }
