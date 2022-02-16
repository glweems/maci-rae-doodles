import { IconButton, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { BiMailSend } from 'react-icons/bi';

export const NewsLetterForm = () => {
  return (
    <Stack align={'flex-start'}>
      <Stack direction={'row'}>
        <Input
          placeholder={'Your email address'}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          border={0}
          _focus={{
            bg: 'whiteAlpha.300',
          }}
          name="email"
          type="email"
        />
        <IconButton
          bg={useColorModeValue('green.400', 'green.800')}
          color={useColorModeValue('white', 'gray.800')}
          _hover={{
            bg: 'green.600',
          }}
          aria-label="Subscribe"
          icon={<BiMailSend />}
          type="submit"
        />
      </Stack>
    </Stack>
  );
};
