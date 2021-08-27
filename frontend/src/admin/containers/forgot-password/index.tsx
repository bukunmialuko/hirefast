import React, { useCallback } from 'react';

import { useToast } from '@chakra-ui/react';

import AdminForgotPasswordForm, {
  ForgotPasswordFieldProps
} from 'admin/components/forgot-password-form';

const AdminForgotPassword = () => {
  const toast = useToast();

  const onSubmit = useCallback(
    async (values: ForgotPasswordFieldProps) => {
      toast({
        title: 'An error occurred.',
        description: JSON.stringify(values),
        status: 'success',
        duration: 1000,
        isClosable: true
      });
      return new Promise<void>(resolve => setTimeout(resolve, 3000));
    },
    [toast]
  );
  return (
    <AdminForgotPasswordForm onSubmit={onSubmit} error={[]} loading={false} />
  );
};

export default AdminForgotPassword;
