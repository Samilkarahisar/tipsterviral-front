import { ITypo } from '@/types/Typo';
import getTextColors from '@/utils/getTextColors';
import React from 'react';

const H2 = ({
  children,
  className = '',
  weight = 'font-semibold',
  color = 'gray2',
  font = 'font-sans',
}: ITypo) => {
  const textColor = getTextColors(color);
  return (
    <h2 className={`${className} ${font} ${weight} ${textColor}`}>
      {children}
    </h2>
  );
};

export default H2;
