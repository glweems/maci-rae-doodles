import {
  AppShell,
  Box,
  Footer,
  Grid,
  Group,
  Header,
  useMantineTheme,
} from '@mantine/core';
import { NavLink } from '@remix-run/react';
import type { ReactNode } from 'react';

export const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Blog', to: '/blog' },
  { name: 'Design', to: '/designs' },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const { colors, headings } = useMantineTheme();
  const navStyle = {
    fontFamily: headings.fontFamily,
    color: colors.yellow[2],
  };
  return (
    <AppShell
      padding={4}
      zIndex={1}
      header={
        <Header height={70} p="md" fixed>
          <nav
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Group position="left" spacing="xs">
              {navItems.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  autoCapitalize="all"
                  style={({ isActive }) =>
                    isActive
                      ? { ...navStyle, color: colors.yellow[5] }
                      : navStyle
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </Group>
          </nav>
        </Header>
      }
      footer={
        <Footer height={80} fixed={false} zIndex={0}>
          <Grid>
            <Grid.Col md={6} lg={3}>
              1
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              2
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              3
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              4
            </Grid.Col>
          </Grid>
        </Footer>
      }
    >
      <Box pt="xl" mt="xl">
        {children}
      </Box>
    </AppShell>
  );
};
