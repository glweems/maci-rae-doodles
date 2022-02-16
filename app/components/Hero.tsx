import type { BoxProps } from '@chakra-ui/react';
import { Box, chakra, Container, VStack } from '@chakra-ui/react';
import type { FC } from 'react';

import type { GradientDirection } from '~/utils/helpers';
import { gradientColorProp } from '~/utils/helpers';

type BgGradientProps = BoxProps & {
  gradient?: string[];
  gradientDir: GradientDirection;
};

const BgGradient: FC<BgGradientProps> = ({
  gradient,
  children,
  gradientDir,
  ...props
}) => (
  <Box {...props} bgGradient={gradientColorProp(gradient, gradientDir)}>
    {children}
  </Box>
);

BgGradient.defaultProps = {
  w: 'full',
  bgClip: 'text',
  display: { base: 'block', lg: 'inline' },
  fontWeight: 'extrabold',
  gradient: ['blue.200', 'blue.800'],
};

export const Hero = () => {
  return (
    <Container>
      <chakra.h1
        p={1}
        my={6}
        fontSize={{ base: '4xl', md: '6xl' }}
        fontWeight="bold"
        lineHeight="none"
        letterSpacing={{ base: 'normal', md: 'tight' }}
        textAlign="center"
      >
        <VStack>
          {['maci', 'rae', 'doodles'].map((name, i) => (
            <BgGradient key={name} gradientDir="to bottom left">
              {name.toUpperCase()}
            </BgGradient>
          ))}
        </VStack>
      </chakra.h1>
    </Container>
  );
};

/*
;
 */
