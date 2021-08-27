import React, { FC } from 'react';

import { Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import FormCtaButton from 'admin/components/form-cta';
import FormFields from 'admin/components/form-fields';
import FormTitle from 'admin/components/form-title';
import FormWrapper from 'admin/components/form-wrapper';
import FormProps from 'admin/interfaces/form-props';

export interface ForgotPasswordFieldProps {
  email: string;
}

const AdminForgotPasswordForm: FC<FormProps<ForgotPasswordFieldProps>> = ({
  onSubmit
}) => {
  const { register, handleSubmit, formState } =
    useForm<ForgotPasswordFieldProps>();

  const submit = handleSubmit(onSubmit);

  return (
    <FormWrapper maxWidth="400px">
      <FormTitle title="Forgot password?" />
      <form onSubmit={submit}>
        <FormFields>
          <Input {...register('email')} placeholder="Email" />
        </FormFields>
        <FormCtaButton
          title="Send reset email"
          onClick={submit}
          isLoading={formState.isSubmitting}
        />
      </form>
    </FormWrapper>
  );
};

export default AdminForgotPasswordForm;
