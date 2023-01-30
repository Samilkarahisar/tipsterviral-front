import { ITypo } from '@/types/Typo';
import getTextColors from '@/utils/getTextColors';
import React from 'react';

interface IParagraph extends ITypo {
  size: 'text-md' | 'text-sm' | 'text-xs' | 'text-2xs' | 'text-base';
  onClick?: () => void;
  [key: string]: any;
}

const Paragraph = ({
  children,
  className = '',
  weight = 'font-semibold',
  color = 'gray2',
  font = 'font-sans',
  size = 'text-sm',
  ...otherProps
}: IParagraph) => {
  const textColor = getTextColors(color);
  return (
    <p
      {...otherProps}
      className={`${className} ${font} ${weight} ${textColor} ${size}`}>
      {children}
    </p>
  );
};

export default Paragraph;
