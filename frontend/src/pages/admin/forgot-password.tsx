import React from 'react';

import { Box, Container } from '@chakra-ui/layout';

import AuthHeader from '@shared/components/auth-header';
import AdminForgotPassword from 'admin/containers/forgot-password';

export default function ForgotPasswordPage() {
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
          <AdminForgotPassword />
        </Box>
      </Container>
    </Box>
  );
}
