import { ThHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ThProps = ThHTMLAttributes<HTMLTableCellElement>;

export const Th = ({ className: _className, ...rest }: ThProps) => {
  const baseClassName =
    'text-pink-1 border-b-2 border-pink-1 border-solid py-3 px-4 text-lg whitespace-nowrap';

  const className = twMerge(baseClassName, _className);

  return <th className={className} {...rest} />;
};
