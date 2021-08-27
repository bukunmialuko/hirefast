import React from 'react';

import InterviewList from 'interview/components/interview-list';
import { Interview } from 'interview/models/interview';

const mockInterviews: Interview[] = [
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  },
  {
    id: 'asdfsadfewqf23',
    name: 'New Hires',
    jobTitle: 'React Developer',
    description: 'You will be closely working with me'
  }
];

const ArchivedInterviews = () => {
  return <InterviewList interviewsList={mockInterviews} />;
};

export default ArchivedInterviews;
