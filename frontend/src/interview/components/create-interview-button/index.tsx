import React from 'react';

import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';

const CreateInterviewButton = () => {
  return (
    <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid" size="sm">
      Create Interview
    </Button>
  );
};

export default CreateInterviewButton;
