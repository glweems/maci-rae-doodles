import type { LinkProps } from '@chakra-ui/react';
import { Link as CLink } from '@chakra-ui/react';
import type { RemixLinkProps } from '@remix-run/react/components';
import type { FC } from 'react';
import { Link as RLink } from "@remix-run/react";
type AppLinkProps = LinkProps & RemixLinkProps;

export const AppLink: FC<AppLinkProps> = ({ children, ...props }) => (
  <CLink as={RLink} {...props}>
    {children}
  </CLink>
);
