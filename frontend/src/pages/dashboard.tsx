import React from 'react';

import { Box, Container } from '@chakra-ui/layout';

import DashboardHeader from '@shared/components/dashboard-header';
import ActiveInterviews from 'interview/containers/active-interviews';

const Dashboard = () => {
  return (
    <Box>
      <Box width="100%" boxShadow="md" backgroundColor="white">
        <Container maxW="container.xl">
          <DashboardHeader />
        </Container>
      </Box>
      <Container maxW="container.xl">
        <ActiveInterviews />
      </Container>
    </Box>
  );
};

export default Dashboard;
