import React, { FC } from 'react';

import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import InterviewStat from 'interview/components/interview-card/stat';
import { Interview } from 'interview/models/interview';

const interviewStats = [
  { statName: 'Finished', count: 67, color: 'green.500' },
  { statName: 'Remaining', count: 33, color: 'red.400' }
];

interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard: FC<InterviewCardProps> = ({ interview }) => {
  return (
    <Box
      cursor="pointer"
      backgroundColor="white"
      p="4"
      maxW="md"
      rounded="md"
      boxShadow="sm"
      _hover={{
        boxShadow: 'md'
      }}
    >
      <Heading as="h1" fontSize="lg">
        {interview.jobTitle}
      </Heading>
      <Heading my="2" as="h3" fontSize="sm" fontWeight="400">
        22/09/2022 to 22/09/2021
      </Heading>
      <Text fontSize="md">{interview.description}</Text>
      <Flex mt="4" width="100%" flexWrap="wrap">
        {interviewStats.map(stat => {
          return (
            <Box key={stat.statName} pr="3">
              <InterviewStat
                statName={stat.statName}
                count={stat.count}
                color={stat.color}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default InterviewCard;
