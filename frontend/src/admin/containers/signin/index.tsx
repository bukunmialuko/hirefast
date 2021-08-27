import React, { useCallback } from 'react';

import { useToast } from '@chakra-ui/react';

import { SignInProps } from '@api/admin/types';
import AdminSignInForm from 'admin/components/signin-form';

const AdminSignIn = () => {
  const toast = useToast();

  const onSubmit = useCallback(
    async (values: SignInProps) => {
      toast({
        title: 'An error occurred.',
        description: JSON.stringify(values),
        status: 'success',
        duration: 1000,
        isClosable: true
      });
    },
    [toast]
  );

  return <AdminSignInForm onSubmit={onSubmit} error={[]} loading={false} />;
};

export default AdminSignIn;
