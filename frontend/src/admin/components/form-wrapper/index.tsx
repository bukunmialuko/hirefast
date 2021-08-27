import React, { FC } from 'react';

import { Box } from '@chakra-ui/layout';

export interface FormWrapperProps {
  maxWidth: string;
}

const FormWrapper: FC<FormWrapperProps> = ({ maxWidth, children }) => {
  return (
    <Box
      maxW={maxWidth}
      w="100%"
      boxShadow="md"
      rounded="md"
      display="block"
      backgroundColor="white"
      p="5"
    >
      {children}
    </Box>
  );
};

export default FormWrapper;
