import { IInput } from '@/types/Form';
import React from 'react';

const TextField = ({
  placeholder,
  icon,
  className = '',
  inputProps,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  required,
  maxLength,
  type = 'text',
  accept,
  min,
  step,
  wrapperClassname,
}: IInput) => {
  return (
    <div className={wrapperClassname ? wrapperClassname : ''}>
      {label && (
        <label htmlFor={inputProps?.name}>
          <label className="mb-2">
            {label}
            {required && type != 'email' && type != 'password' ? (
              <span className="text-red ml-1">*</span>
            ) : null}
          </label>
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {icon ? (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        ) : null}
        <input
          className={`${className} block w-full ${
            icon ? 'pl-14 pr-4' : 'px-4'
          } py-[14px] text-sm outline-none max-h-[49px] bg-secondary border-transparent border focus:border-gray2 hover:border-gray2 dark:bg-dark-secondary rounded-lg text-gray2`}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          type={type}
          accept={accept}
          min={min}
          step={step}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default TextField;
