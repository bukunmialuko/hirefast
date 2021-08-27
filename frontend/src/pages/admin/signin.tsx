import React from 'react';

import { Box, Container } from '@chakra-ui/layout';

import AuthHeader from '@shared/components/auth-header';
import AdminSignIn from 'admin/containers/signin';

export default function SigninPage() {
  return (
    <Box>
      <Box width="100%" boxShadow="md" backgroundColor="white">
        <Container maxW="container.xl">
          <AuthHeader />
        </Container>
      </Box>
      <Container maxW="container.xl">
        <Box
          w="100%"
          minH="80vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AdminSignIn />
        </Box>
      </Container>
    </Box>
  );
}
