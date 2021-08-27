import React, { FC } from 'react';

import { Heading } from '@chakra-ui/layout';

interface FormTitleProps {
  title: string;
}

const FormTitle: FC<FormTitleProps> = ({ title }) => {
  return (
    <Heading as="h2" size="md">
      {title}
    </Heading>
  );
};

export default FormTitle;
