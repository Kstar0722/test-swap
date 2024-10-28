import { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';

type InputProps = {
  containerClassName?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  endIcon?: ReactNode;
};

export const Input = ({
  containerClassName: _containerClassName = '',
  inputProps: { className: _inputClassName, ...restInputProps } = {},
  label = '',
  endIcon,
}: InputProps) => {
  const containerBaseClassName =
    'border-2 border-pink-1 rounded-xl px-3 pt-3 pb-2 flex flex-col justify-center min-h-16 gap-2';

  const containerClassName = twMerge(containerBaseClassName, _containerClassName);

  const inputBaseClassName =
    'pink-input outline-none text-pink-1 text-2xl font-semibold leading-[100%] w-full';

  const inputClassName = twMerge(inputBaseClassName, _inputClassName);

  return (
    <div className={containerClassName}>
      {label && (
        <Typography variant="caption" color="pink">
          {label}
        </Typography>
      )}

      <div className="flex items-center w-full gap-1">
        <input className={inputClassName} {...restInputProps} />

        {endIcon && endIcon}
      </div>
    </div>
  );
};
