import { RemixBrowser } from '@remix-run/react';
import { hydrate } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document, <RemixBrowser />);
// hydrate(<RemixBrowser />, document);
