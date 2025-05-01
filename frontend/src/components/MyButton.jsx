import React from 'react'
import { Button } from "@heroui/react";

export const MyButton = ({
    text = 'Añade text',
    color = 'primary',
    variant = 'shadow',
    radius = 'full',
    ...props
  }) => {
    return (
      <Button color={color} variant={variant} radius={radius} {...props}>
        {text}
      </Button>
    );
  };
  
