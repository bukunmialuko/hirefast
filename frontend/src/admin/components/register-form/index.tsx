import React, { FC } from 'react';

import { Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { RegisterProps } from '@api/admin/types';
import FormCtaButton from 'admin/components/form-cta';
import FormFields from 'admin/components/form-fields';
import FormTitle from 'admin/components/form-title';
import FormWrapper from 'admin/components/form-wrapper';
import FormProps from 'admin/interfaces/form-props';

const AdminRegisterForm: FC<FormProps<RegisterProps>> = ({
  onSubmit,
  loading
}) => {
  const { register, handleSubmit, formState } = useForm<RegisterProps>();

  const submit = handleSubmit(onSubmit);

  return (
    <FormWrapper maxWidth="400px">
      <FormTitle title="Register" />
      <form onSubmit={submit}>
        <FormFields>
          <Input {...register('email')} placeholder="Email" />
          <Input {...register('name')} placeholder="Name" />
          <Input {...register('companyName')} placeholder="Company name" />
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
          />
          <Input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
          />
        </FormFields>
        <FormCtaButton
          title="Register"
          onClick={submit}
          isLoading={loading || formState.isSubmitting}
        />
      </form>
    </FormWrapper>
  );
};

export default AdminRegisterForm;
