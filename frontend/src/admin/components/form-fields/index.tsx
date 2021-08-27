import React, { FC } from 'react';

import { Stack } from '@chakra-ui/react';

const FormFields: FC = ({ children }) => {
  return (
    <Stack my="6" spacing={3}>
      {children}
    </Stack>
  );
};

export default FormFields;
