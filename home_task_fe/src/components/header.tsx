import React, { PropsWithChildren } from 'react';
import { CardTitle } from './ui/card';

export const Title = ({ children }: PropsWithChildren) => {
  return <CardTitle className='my-6'>{children}</CardTitle>;
};
