import React, { FC } from 'react';

import { Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';

interface InterviewStatProps {
  statName: string;
  count: number;
  color?: string;
}

const InterviewStat: FC<InterviewStatProps> = ({ statName, count, color }) => {
  return (
    <Box
      width="max-content"
      rounded="xl"
      backgroundColor={color ?? 'gray.200'}
      py="1"
      px="2"
    >
      <Heading as="h1" fontSize="xs" color="white">
        {count} {statName}
      </Heading>
    </Box>
  );
};
export default InterviewStat;
