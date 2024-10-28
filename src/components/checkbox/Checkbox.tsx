'use client';

import {
  Checkbox as HeadlessuiCheckbox,
  CheckboxProps as HeadlessuiCheckboxProps,
} from '@headlessui/react';
import { ReactNode, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components';
import { CheckSvg } from '@/svgs';

type CheckboxProps = HeadlessuiCheckboxProps & {
  label?: ReactNode;
};

export const Checkbox = ({ className: _className = '', label = null, ...rest }: CheckboxProps) => {
  const baseClassName =
    'group size-6 rounded-lg border-2 bg-white transition data-[checked]:bg-pink-1 data-[checked]:border-pink-1 inline-flex items-center justify-center';

  const className = twMerge(baseClassName, _className as string);

  const renderTextLabel = useCallback(() => {
    return (
      <Typography color="black" className="leading-[100%]">
        {label}
      </Typography>
    );
  }, [label]);

  return (
    <div className="inline-flex items-center gap-3 cursor-pointer">
      <HeadlessuiCheckbox className={className} {...rest}>
        <CheckSvg width={16} height={16} className="text-white" />
      </HeadlessuiCheckbox>

      {label && <div className="pt-1">{typeof label === 'string' ? renderTextLabel() : label}</div>}
    </div>
  );
};
