import { ITypo } from '@/types/Typo';
import getTextColors from '@/utils/getTextColors';
import React from 'react';

const H3 = ({
  children,
  className = '',
  weight = 'font-semibold',
  color = 'gray2',
  font = 'font-sans',
}: ITypo) => {
  const textColor = getTextColors(color);
  return (
    <h3
      className={`${className} ${font} ${weight} ${textColor} laptop:text-base`}>
      {children}
    </h3>
  );
};

export default H3;
