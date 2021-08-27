import React, { FC } from 'react';

import { Heading } from '@chakra-ui/react';

interface DashboardNavigationLinkProps {
  text: string;
}

const DashboardNavigationLink: FC<DashboardNavigationLinkProps> = ({
  text
}) => {
  return (
    <Heading
      as="h3"
      size="sm"
      py="2"
      px="4"
      borderRadius="md"
      cursor="pointer"
      _hover={{ backgroundColor: 'gray.300' }}
    >
      {text}
    </Heading>
  );
};

export default DashboardNavigationLink;
