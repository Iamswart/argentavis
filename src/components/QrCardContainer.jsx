import { Box } from '@chakra-ui/react'
import React, { ReactNode, forwardRef } from 'react';



const QrCardContainer = forwardRef(({ children }, ref) => {
  return (
    <Box 
      ref={ref}
      _hover={{ transform: 'scale(1.03)', transition: 'transform .15s ease-in' }}
      borderRadius={10}
      overflow='hidden'
    >
      {children}
    </Box>
  );
});


export default QrCardContainer