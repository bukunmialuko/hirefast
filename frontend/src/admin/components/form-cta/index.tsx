import React, { FC } from 'react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

interface FormCtaButtonProps {
  title: string;
  [x: string]: any;
}

const FormCtaButton: FC<FormCtaButtonProps> = ({ title, ...others }) => {
  return (
    <Button
      {...others}
      colorScheme="twitter"
      rightIcon={<ArrowForwardIcon />}
      variant="solid"
      w="100%"
    >
      {title}
    </Button>
  );
};

export default FormCtaButton;
