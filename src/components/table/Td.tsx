import { TdHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TdProps = TdHTMLAttributes<HTMLTableCellElement>;

export const Td = ({ className: _className, ...rest }: TdProps) => {
  const baseClassName = '';

  const className = twMerge(baseClassName, _className);

  return <td className={className} {...rest} />;
};
