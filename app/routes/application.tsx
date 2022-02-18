import { Container } from '@chakra-ui/react';
import Iframe from 'react-iframe';
import type { LinksFunction } from 'remix';

export const links: LinksFunction = () => [
  {
    as: 'script',
    rel: 'modulepreload',
    href: 'https://static.airtable.com/js/embed/embed_snippet_v1.js',
  },
];

import { Layout } from '~/components/Layout';
const ApplicationPage = () => {
  return (
    <Layout>
      <Container>
        <Iframe
          url="https://airtable.com/embed/shrsRwp4b5YPkB3wO?backgroundColor=blueLight"
          width="100%"
          height="4050px"
          overflow="hidden"
          styles={{
            background: 'transparent',
            border: '1px solid #ccc',
            overflow: 'hidden',
          }}
        />
      </Container>
    </Layout>
  );
};

export default ApplicationPage;
