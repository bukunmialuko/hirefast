import React, { FC } from 'react';

import { List, ListItem } from '@chakra-ui/layout';

import InterviewCard from 'interview/components/interview-card';
import { Interview } from 'interview/models/interview';

interface InterviewListProps {
  interviewsList: Interview[];
}

const InterviewList: FC<InterviewListProps> = ({ interviewsList }) => {
  return (
    <List display="grid" gridTemplateColumns="1fr 1fr 1fr">
      {interviewsList.map(interview => {
        return (
          <ListItem key={interview.id} mx="2" my="3">
            <InterviewCard interview={interview} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default InterviewList;
