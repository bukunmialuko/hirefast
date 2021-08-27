import React from 'react';

import { Box, Container } from '@chakra-ui/layout';

import AuthHeader from '@shared/components/auth-header';
import AdminRegister from 'admin/containers/register';

export default function RegisterPage() {
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
          <AdminRegister />
        </Box>
      </Container>
    </Box>
  );
}
