import React, { useCallback } from 'react';

import { useToast } from '@chakra-ui/react';

import { RegisterProps } from '@api/admin/types';
import AdminRegisterForm from 'admin/components/register-form';

const AdminRegister = () => {
  const toast = useToast();

  const onSubmit = useCallback(
    async (values: RegisterProps) => {
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

  return <AdminRegisterForm onSubmit={onSubmit} error={[]} loading={false} />;
};

export default AdminRegister;
