import React, { FC } from 'react';

import { Box, Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';

import DashboardNavigationLink from '@shared/components/dashboard-header/navigation-link';
import AdminProfileButton from 'admin/components/profile-button';
import CreateInterviewButton from 'interview/components/create-interview-button';

export interface DashboardHeaderComponentProps {
  companyName: string;
}

const DashboardHeaderComponent: FC<DashboardHeaderComponentProps> = ({
  companyName
}) => {
  return (
    <Flex width="100%" p="2" justifyContent="space-between" alignItems="center">
      <Heading as="h1" size="md">
        {companyName}
      </Heading>
      <Flex justifyContent="space-between" alignItems="center">
        <DashboardNavigationLink text="Active" />
        <DashboardNavigationLink text="Archived" />
        <DashboardNavigationLink text="Drafts" />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <CreateInterviewButton />
        <Box w="5" />
        <AdminProfileButton />
      </Flex>
    </Flex>
  );
};

export default DashboardHeaderComponent;
