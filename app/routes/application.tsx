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
    <Layout minHeight="4200vh">
      <iframe
        className="airtable-embed airtable-dynamic-height"
        src="https://airtable.com/embed/shrsRwp4b5YPkB3wO?backgroundColor=blueLight"
        frameBorder="0"
        onMouseMove={(e) => null}
        width="100%"
        height="4042"
        samesite="Secure"
        style={{ background: 'transparent', border: '1px solid #ccc' }}
      ></iframe>
    </Layout>
  );
};

export default ApplicationPage;
