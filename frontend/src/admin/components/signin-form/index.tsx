import React, { FC } from 'react';

import { Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { SignInProps } from '@api/admin/types';
import FormCtaButton from 'admin/components/form-cta';
import FormFields from 'admin/components/form-fields';
import FormTitle from 'admin/components/form-title';
import FormWrapper from 'admin/components/form-wrapper';
import FormProps from 'admin/interfaces/form-props';

const AdminSignInForm: FC<FormProps<SignInProps>> = ({ onSubmit }) => {
  const { register, handleSubmit, formState } = useForm<SignInProps>();

  const submit = handleSubmit(onSubmit);

  return (
    <FormWrapper maxWidth="400px">
      <FormTitle title="Sign in" />
      <form onSubmit={submit}>
        <FormFields>
          <Input {...register('email')} placeholder="Email" />
          <Input {...register('password')} placeholder="Password" />
        </FormFields>
        <FormCtaButton
          title="Sign in"
          onClick={submit}
          isLoading={formState.isSubmitting}
        />
      </form>
    </FormWrapper>
  );
};

export default AdminSignInForm;
