import { Box } from '@chakra-ui/react';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import type { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useLocalStorage } from 'react-use';
type ReactJsonProps = {
  open?: boolean | string[];
};

const ReactJson: FC<ReactJsonProps> = ({
  open: initialOpen = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useLocalStorage<ReactJsonProps['open']>(
    'reactJsonOpen',
    initialOpen,
  );
  function handleClick(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <Box
      maxW="sm"
      maxH="50vh"
      borderWidth="1px"
      borderRadius="lg"
      p={2}
      overflowY="auto"
      overflowX="hidden"
      fontSize="sm"
      fontFamily="monospace"
      bg="gray.900"
    >
      {Object.entries(props).map(([key, value], index) => {
        return (
          <Box key={nanoid()}>
            <Box position="sticky" top="0" onClick={handleClick}>
              {key}{' '}
              {_.isArray(value) && (
                <Box as="span" color="blue.300">{`(${value.length})`}</Box>
              )}
            </Box>
            {isOpen && (
              <SyntaxHighlighter
                language="json"
                theme={monokai}
                customStyle={{
                  backgroundColor: 'transparent',
                }}
              >
                {JSON.stringify({ [key]: value }, null, 2)}
              </SyntaxHighlighter>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ReactJson;
