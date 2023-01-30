import { ITypo } from '@/types/Typo';
import getTextColors from '@/utils/getTextColors';
import React from 'react';

const H4 = ({
  children,
  className = '',
  weight = 'font-semibold',
  color = 'gray2',
  font = 'font-sans',
}: ITypo) => {
  const textColor = getTextColors(color);
  return (
    <h4
      className={`${font} ${weight} tablet:text-md ${textColor} ${className}`}>
      {children}
    </h4>
  );
};

export default H4;
