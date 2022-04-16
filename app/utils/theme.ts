import type { MantineTheme } from '@mantine/core';
import { DEFAULT_THEME } from '@mantine/core';

export const theme: MantineTheme = {
  ...DEFAULT_THEME,
  focusRing: 'never',
  colorScheme: 'dark',
  fontFamily: 'Matter',
  fontFamilyMonospace: 'Source Code Pro',
  primaryColor: 'yellow',
  fontSizes: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  },
  other: {
    fontFamily: 'Matter',
    fontFamilyMonospace: 'Source Code Pro',
    fontFamilyHeadings: 'Matter',
  },
  headings: {
    fontFamily: '"Founders Grotesk", sans-serif',
    fontWeight: 'bold',
    sizes: {
      h1: { fontSize: 60, lineHeight: 1.2 },
      h2: { fontSize: 46, lineHeight: 1.35 },
      h3: { fontSize: 32, lineHeight: 1.4 },
      h4: { fontSize: 28, lineHeight: 1.45 },
      h5: { fontSize: 20, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 },
    },
  },
};
