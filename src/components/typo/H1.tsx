import { ITypo } from '@/types/Typo';
import getTextColors from '@/utils/getTextColors';
import React from 'react';

const H1 = ({
  children,
  className = '',
  weight = 'font-bold',
  color = 'gray2',
  font = 'font-secondary',
}: ITypo) => {
  const textColor = getTextColors(color);
  return (
    <h1
      className={`${className} ${font} ${weight} ${textColor} laptop:text-2xl`}>
      {children}
    </h1>
  );
};

export default H1;
