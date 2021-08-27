import React from 'react';

import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';

const AuthHeader = () => {
  return (
    <Flex
      width="100%"
      py="4"
      px="2"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading as="h1" size="md">
        Hirefast
      </Heading>
    </Flex>
  );
};

export default AuthHeader;
